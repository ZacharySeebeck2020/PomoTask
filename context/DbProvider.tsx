import { createContext, useContext, useEffect, useState } from 'react';
import RetrieveDb from '../lib/db';
import { DbContextValues } from '../types/data';

const DbContext = createContext<Partial<DbContextValues>>({});

const DbProvider = ({ children }) => {
    const [dbContext, setDbContext] = useState<DbContextValues>({ 
        db: undefined,
        loading: true
    });

    useEffect(() => {
        if (localStorage) {
            setDbContext({
                db: RetrieveDb(false),
                loading: false
            })
        }
    }, [])

    return (
        <DbContext.Provider value={dbContext}>
            {children}
        </DbContext.Provider>
    );
};

export const useDb = () => useContext(DbContext);

export default DbProvider;
