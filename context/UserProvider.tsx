import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';
import RetrieveDb from '../lib/db';
import { DbContextValues, UserContextValues } from '../types/data';
import { PomodoroStatus, User } from '../types/db';
import Notifier from '../util/notifier'

const UserContext = createContext<Partial<UserContextValues>>({});

const UserProvider = ({ children }) => {
    const [userObj, setUserObj] = useState<User>()
    const [userContext, setUserContext] = useState<UserContextValues>({
        userObj,
        setUserObj
    });

    useEffect(() => {
        setUserContext({
            userObj,
            setUserObj
        });
    }, [userObj]);

    return (
        <UserContext.Provider value={userContext}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
