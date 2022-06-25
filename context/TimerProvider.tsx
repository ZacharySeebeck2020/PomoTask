import { Router } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { TimerContextValues } from '../types/data';
import { User } from '../types/db';
import { UpdatePomodoro, UpdateProject } from '../util/Apis';
import notifier from '../util/notifier';
import { BreakApartTime, IncreaseByTime, SubtractByTime, TimeToString } from '../util/time';
import { useUser } from './UserProvider';

const TimerContext = createContext<Partial<TimerContextValues>>({});

const TimerProvider = ({ children }) => {
    const { userObj, setUserObj } = useUser();
    const [ shouldUpdateUser, setShouldUpdateUser ] = useState(true);

    function RunTimer() {
        let pomodoroBrokenTime = BreakApartTime(userObj.pomodoro.remainingTime);
        pomodoroBrokenTime = SubtractByTime(
            pomodoroBrokenTime,
            {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 1
            }
        );

        // Add second to project time.
        let projectBrokenTime = BreakApartTime(userObj.activeProject.timeSpent);
        projectBrokenTime = IncreaseByTime(
            projectBrokenTime,
            {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 1
            }
        );

        if (userObj.pomodoro.currentStatus != 'FOCUS') {
            setUserObj({
                ...userObj,
                pomodoro: {
                    ...userObj.pomodoro,
                    remainingTime: TimeToString(pomodoroBrokenTime)
                }
            });
        } else {
            setUserObj({
                ...userObj,
                pomodoro: {
                    ...userObj.pomodoro,
                    remainingTime: TimeToString(pomodoroBrokenTime)
                },
                activeProject: {
                    ...userObj.activeProject,
                    timeSpent: TimeToString(projectBrokenTime)
                }
            });
        }
    }

    async function CheckTimer() {
        let brokenTime = BreakApartTime(userObj.pomodoro.remainingTime);
        if (brokenTime.days <= 0 && brokenTime.hours <= 0 && brokenTime.minutes <= 0 && brokenTime.seconds <= 0) {
            switch (userObj.pomodoro.currentStatus) {
                case 'FOCUS':
                    notifier.ShowNotification('Pomotask - Focus Over', 'Focus time is over, enjoy a break.')
                    if (userObj.pomodoro.currentSession == userObj.pomodoro.totalSessions) {
                        setUserObj(await UpdatePomodoro({
                            remainingTime: userObj.pomodoro.longBreakDuration,
                            currentStatus: 'LONG BREAK',
                            isRunning: false,
                            currentSession: 1
                        }, userObj));
                    } else {
                        console.log('short break', userObj.pomodoro.shortBreakDuration);
                        setUserObj(await UpdatePomodoro({
                            ...userObj.pomodoro,
                            remainingTime: userObj.pomodoro.shortBreakDuration,
                            currentStatus: 'SHORT BREAK',
                            isRunning: false,
                            currentSession: userObj.pomodoro.currentSession + 1
                        }, userObj));
                    }
                    break;
                case 'SHORT BREAK':
                    notifier.ShowNotification('Pomotask - Break Over', 'Break time is over, time to get back to work.')
                    setUserObj(await UpdatePomodoro({
                        ...userObj.pomodoro,
                        remainingTime: userObj.pomodoro.workDuration,
                        isRunning: false,
                        currentStatus: 'FOCUS'
                    }, userObj));
                    break;
                case 'LONG BREAK':
                    notifier.ShowNotification('Pomotask - Break Over', 'Break time is over, time to get back to work.')
                    setUserObj(await UpdatePomodoro({
                        ...userObj.pomodoro,
                        remainingTime: userObj.pomodoro.workDuration,
                        isRunning: false,
                        currentStatus: 'FOCUS'
                    }, userObj))
                    break;
            }
            return;
        }
    }

    async function UpdateUser() {
        if (!shouldUpdateUser) return;
        
        UpdatePomodoro({
            remainingTime: userObj.pomodoro.remainingTime,
        }, userObj);

        setUserObj(await UpdateProject(userObj.activeProject.id, {
            timeSpent: userObj.activeProject.timeSpent
        }, userObj));

        setShouldUpdateUser(false);
        setTimeout(() => {
            setShouldUpdateUser(true);
        }, 10000)
    }

    useEffect(() => {
        if (!userObj) return;

        if (userObj.pomodoro.isRunning) {
            const checkingIntervalId = setInterval(CheckTimer, 1000);
            const timerIntervalId = setInterval(RunTimer, 1000);

            return () => {
                clearInterval(timerIntervalId);
                clearInterval(checkingIntervalId);
                UpdateUser();
            }
        } else {
            // setTimer(userObj.pomodoro.remainingTime);
        }

    });

    return (
        <TimerContext.Provider value={{}}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => useContext(TimerContext);

export default TimerProvider;
