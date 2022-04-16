import { createContext, useContext, useEffect, useState } from 'react';
import RetrieveDb from '../lib/db';
import { DbContextValues } from '../types/data';

const DbContext = createContext<Partial<DbContextValues>>({});

const DbProvider = ({ children }) => {
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
    }, [updateDb]);

    useEffect(() => {
        if (dbContext.loading) return;
    
        if (dbContext.db.pomodoro.isRunning) {
          const intervalId = setInterval(() => {
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
