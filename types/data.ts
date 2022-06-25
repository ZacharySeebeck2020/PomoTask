import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import { Db, User } from "./db";

export interface DbContextValues {
    db: Db;
    loading: boolean;
    refreshDb(): void;
}

export interface TimerContextValues {
    timer: string;
    projectTimeSpent: string;
    setUserObj: Dispatch<SetStateAction<User>>;
    ResetTimer: Function;

}