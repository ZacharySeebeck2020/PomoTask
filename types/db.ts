export interface Db {
    pomodoro: Pomodoro;
}

export interface User {

}

export interface Projects {

}

export interface Tasks {

}

export type Pomodoro = {
    remainingTime: number;
    currentStatus: PomodoroStatus;
    currentSession: number;
    totalSessions: number;
    workDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    isRunning: boolean;
}

export enum PomodoroStatus {
    FOCUS,
    SHORT_BREAK,
    LONG_BREAK
}