import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';
import RetrieveDb from '../lib/db';
import { DbContextValues } from '../types/data';
import { PomodoroStatus } from '../types/db';
import Notifier from '../util/notifier'

const DbContext = createContext<Partial<DbContextValues>>({});

const DbProvider = ({ children }) => {
    const { data: session, status } = useSession();
    const [updateDb, setUpdateDb] = useState(true);
    const [dbContext, setDbContext] = useState<DbContextValues>({ 
        db: undefined,
        loading: true,
        refreshDb: () => {
            setUpdateDb(true);
        }
    });

    useEffect(() => {
        if (localStorage) {
            setDbContext({
                db: RetrieveDb(false),
                loading: false,
                refreshDb: () => {
                    setUpdateDb(true);
                }
            })

            setUpdateDb(false);
        }
    }, [updateDb, status]);

    useEffect(() => {
        if (dbContext.loading) return;
    
        if (dbContext.db.pomodoro.isRunning) {
          const intervalId = setInterval(() => {
            if (dbContext.db.pomodoro.remainingTime == '00:00:00:00') {
                switch (dbContext.db.pomodoro.currentStatus) {
                    case PomodoroStatus.FOCUS:
                        Notifier.ShowNotification('Pomotask - Focus Over', 'Focus time is over, enjoy a break.')
                        if (dbContext.db.pomodoro.currentSession == dbContext.db.pomodoro.totalSessions) {
                            dbContext.db.UpdatePomodoro({
                                ...dbContext.db.pomodoro,
                                remainingTime: dbContext.db.pomodoro.longBreakDuration,
                                currentStatus: PomodoroStatus.LONG_BREAK,
                                currentSession: 1,
                                isRunning: false
                            });
                        } else {
                            dbContext.db.UpdatePomodoro({
                                ...dbContext.db.pomodoro,
                                remainingTime: dbContext.db.pomodoro.shortBreakDuration,
                                currentStatus: PomodoroStatus.SHORT_BREAK,
                                currentSession: dbContext.db.pomodoro.currentSession + 1,
                                isRunning: false
                            });

                        }
                        break;
                    case PomodoroStatus.SHORT_BREAK:
                        Notifier.ShowNotification('Pomotask - Break Over', 'Break time is over, time to get back to work.')
                        dbContext.db.UpdatePomodoro({
                            ...dbContext.db.pomodoro,
                            remainingTime: dbContext.db.pomodoro.workDuration,
                            currentStatus: PomodoroStatus.FOCUS,
                            isRunning: false
                        });
                        break;
                    case PomodoroStatus.LONG_BREAK:
                        Notifier.ShowNotification('Pomotask - Break Over', 'Break time is over, time to get back to work.')
                        dbContext.db.UpdatePomodoro({
                            ...dbContext.db.pomodoro,
                            remainingTime: dbContext.db.pomodoro.workDuration,
                            currentStatus: PomodoroStatus.FOCUS,
                            isRunning: false
                        })
                        break;
                }
                setUpdateDb(true);
                return;
            }


            dbContext.db.RunTimer();
            setUpdateDb(true);
          }, 1000)
    
          return () => {
            clearInterval(intervalId);
          }
        }
    
      }, [dbContext])

    return (
        <DbContext.Provider value={dbContext}>
            {children}
        </DbContext.Provider>
    );
};

export const useDb = () => useContext(DbContext);

export default DbProvider;
