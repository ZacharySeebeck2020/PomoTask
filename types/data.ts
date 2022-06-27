import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import { Db, User } from "./db";

export interface DbContextValues {
    db: Db;
    loading: boolean;
    refreshDb(): void;
}

export interface TimerContextValues {}

export interface UserContextValues {
    userObj: User | null;
    setUserObj: Dispatch<SetStateAction<User>>;
}