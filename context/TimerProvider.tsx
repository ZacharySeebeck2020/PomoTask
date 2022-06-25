import { createContext, useContext, useEffect, useState } from 'react';
import { TimerContextValues } from '../types/data';
import { User } from '../types/db';
import { UpdatePomodoro, UpdateProject } from '../util/Apis';
import notifier from '../util/notifier';
import { BreakApartTime, IncreaseByTime, SubtractByTime, TimeToString } from '../util/time';

const TimerContext = createContext<Partial<TimerContextValues>>({});

const TimerProvider = ({ children }) => {
    const [timer, setTimer] = useState<string>('');
    const [projectTimeSpent, setProjectTimeSpent] = useState<string>('');
    const [setTime, shouldSetTime] = useState<boolean>(true);
    const [userObj, setUserObj] = useState<User>();

    const [timerContext, setTimerContext] = useState<TimerContextValues>({
        timer,
        projectTimeSpent,
        setUserObj,
        ResetTimer
    });
    
    function ResetTimer (userObj: User) {
        setUserObj(userObj);
        shouldSetTime(true);
    }

    useEffect(() => {
        if (!userObj) return;

        UpdateUser();

        return () => {
            UpdateUser();
        }
    }, [userObj])

    useEffect(() => {
        setTimerContext({
            timer,
            projectTimeSpent,
            setUserObj,
            ResetTimer
        });
    }, [timer, projectTimeSpent])

    function RunTimer() {
        setTimer((time) => {
            let brokenTime = BreakApartTime(time);
            brokenTime = SubtractByTime(
                brokenTime,
                {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 1
                }
            );

            return TimeToString(brokenTime);
        })

        if (userObj.pomodoro.currentStatus != 'FOCUS') return;

        // Add second to project time.
        setProjectTimeSpent((time) => {
            let brokenTime = BreakApartTime(time);
            brokenTime = IncreaseByTime(
                brokenTime,
                {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 1
                }
            );

            return TimeToString(brokenTime);
        })

    }

    async function CheckTimer() {
        let brokenTime = BreakApartTime(timer);
        if (brokenTime.days <= 0 && brokenTime.hours <= 0 && brokenTime.minutes <= 0 && brokenTime.seconds <= 0) {
            switch (userObj.pomodoro.currentStatus) {
                case 'FOCUS':
                    notifier.ShowNotification('Pomotask - Focus Over', 'Focus time is over, enjoy a break.')
                    if (userObj.pomodoro.currentSession == userObj.pomodoro.totalSessions) {
                        shouldSetTime(true);
                        setUserObj(await UpdatePomodoro({
                            remainingTime: userObj.pomodoro.longBreakDuration,
                            currentStatus: 'LONG BREAK',
                            currentSession: 1
                        }, userObj));
                    } else {
                        shouldSetTime(true);
                        setUserObj(await UpdatePomodoro({
                            ...userObj.pomodoro,
                            remainingTime: userObj.pomodoro.shortBreakDuration,
                            currentStatus: 'SHORT BREAK',
                            currentSession: userObj.pomodoro.currentSession + 1
                        }, userObj));
                    }
                    break;
                case 'SHORT BREAK':
                    shouldSetTime(true);
                    notifier.ShowNotification('Pomotask - Break Over', 'Break time is over, time to get back to work.')
                    setUserObj(await UpdatePomodoro({
                        ...userObj.pomodoro,
                        remainingTime: userObj.pomodoro.workDuration,
                        currentStatus: 'FOCUS'
                    }, userObj));
                    break;
                case 'LONG BREAK':
                    shouldSetTime(true);
                    notifier.ShowNotification('Pomotask - Break Over', 'Break time is over, time to get back to work.')
                    setUserObj(await UpdatePomodoro({
                        ...userObj.pomodoro,
                        remainingTime: userObj.pomodoro.workDuration,
                        currentStatus: 'FOCUS'
                    }, userObj))
                    break;
            }
            return;
        }
    }

    function UpdateUser() {
        setTimer((timer) => {
            
            UpdatePomodoro({
                remainingTime: timer ? timer : userObj.pomodoro.remainingTime,
            }, userObj);

            return timer;
        });

        setProjectTimeSpent((projectTimeSpent) => {
            UpdateProject(userObj.activeProject.id, {
                timeSpent: projectTimeSpent
            }, userObj);

            return projectTimeSpent;
        });

    }

    useEffect(() => {
        if (!userObj) return;

        if (setTime) {
            setTimer(userObj.pomodoro.remainingTime);
            setProjectTimeSpent(userObj.activeProject.timeSpent);
            shouldSetTime(false);
        }

        if (userObj.pomodoro.isRunning) {
            const checkingIntervalId = setInterval(CheckTimer.bind(this), 1000);
            const timerIntervalId = setInterval(RunTimer, 1000);
            const updateUserIntervalId = setInterval(UpdateUser, 30000);

            return () => {
                clearInterval(timerIntervalId);
                clearInterval(checkingIntervalId);
                clearInterval(updateUserIntervalId);
            }
        } else {
            // setTimer(userObj.pomodoro.remainingTime);
        }

    });

    return (
        <TimerContext.Provider value={timerContext}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => useContext(TimerContext);

export default TimerProvider;
