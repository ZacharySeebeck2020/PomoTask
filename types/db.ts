export interface Db {
    pomodoro: Pomodoro;
    user: User;
    projects: Array<Project>;
    tasks: Array<Task>;

    GetProjectTasks(projId: string): Array<Task>;
    UpdateTask(taskId: string, task: Task): void;
    UpdateProject(projId: string, project: Project): void;
    CreateTask(projId: string, task: Partial<Task>): void;
    CreateProject(project: Partial<Project>): void;
    DeleteProject(project: Project): void;

    PausePlayTimer(): void;
    RunTimer(): void;
}

export type User = {

}

export type Project = {
    id: string;
    name: string;
    timeSpent: number;
}

export type Task = {
    id: string;
    project: string;
    completed: boolean;
    value: string;
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