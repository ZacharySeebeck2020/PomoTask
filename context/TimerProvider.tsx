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
        setUserObj
    });


    useEffect(() => {
        setTimerContext({
            timer,
            projectTimeSpent,
            setUserObj
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

    function CheckTimer() {
        if (userObj.pomodoro.remainingTime == '00:00:00:00') {
            switch (userObj.pomodoro.currentStatus) {
                case 'FOCUS':
                    notifier.ShowNotification('Pomotask - Focus Over', 'Focus time is over, enjoy a break.')
                    if (userObj.pomodoro.currentSession == userObj.pomodoro.totalSessions) {
                        UpdatePomodoro({
                            ...userObj,
                            pomodoro: {
                                ...userObj.pomodoro,
                                remainingTime: userObj.pomodoro.longBreakDuration,
                                currentStatus: 'LONG BREAK',
                                currentSession: 1,
                                isRunning: false
                            }
                        });
                    } else {
                        UpdatePomodoro({
                            ...userObj,
                            pomodoro: {
                                ...userObj.pomodoro,
                                remainingTime: userObj.pomodoro.shortBreakDuration,
                                currentStatus: 'SHORT BREAK',
                                currentSession: userObj.pomodoro.currentSession + 1,
                                isRunning: false
                            }
                        });

                    }
                    break;
                case 'SHORT BREAK':
                    notifier.ShowNotification('Pomotask - Break Over', 'Break time is over, time to get back to work.')
                    UpdatePomodoro({
                        ...userObj,
                        pomodoro: {
                            ...userObj.pomodoro,
                            remainingTime: userObj.pomodoro.workDuration,
                            currentStatus: 'FOCUS',
                            isRunning: false
                        }
                    });
                    break;
                case 'LONG BREAK':
                    notifier.ShowNotification('Pomotask - Break Over', 'Break time is over, time to get back to work.')
                    UpdatePomodoro({
                        ...userObj,
                        pomodoro: {
                            ...userObj.pomodoro,
                            remainingTime: userObj.pomodoro.workDuration,
                            currentStatus: 'FOCUS',
                            isRunning: false
                        }
                    })
                    break;
            }
            return;
        }
    }

    function UpdateUser() {
        UpdatePomodoro({
            ...userObj,
            pomodoro: {
                ...userObj.pomodoro,
                remainingTime: timer
            }
        });

        UpdateProject(userObj.activeProject.id, {
            timeSpent: projectTimeSpent
        }, userObj);
    }

    useEffect(() => {
        if (!userObj) return;

        if (setTime) {
            setTimer(userObj.pomodoro.remainingTime);
            setProjectTimeSpent(userObj.activeProject.timeSpent);
            shouldSetTime(false);
        }

        if (userObj.pomodoro.isRunning) {
            const checkingIntervalId = setInterval(() => CheckTimer(), 1000);
            const timerIntervalId = setInterval(() => RunTimer(), 1000);
            const updateUserIntervalId = setInterval(() => UpdateUser(), 10000);

            return () => {
                clearInterval(timerIntervalId);
                clearInterval(checkingIntervalId);
                clearInterval(updateUserIntervalId);
                UpdateUser();
            }
        }

    }, [userObj]);

    return (
        <TimerContext.Provider value={timerContext}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => useContext(TimerContext);

export default TimerProvider;
