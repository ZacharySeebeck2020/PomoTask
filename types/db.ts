export interface Db {
    pomodoro: Pomodoro;
    user: User;
    projects: Array<Project>;
    tasks: Array<Task>;

    UpdatePomodoro(pomodoro: Pomodoro): void;

    GetProjectTasks(projId: string): Array<Task>;
    UpdateTask(taskId: string, task: Task): void;
    UpdateProject(projId: string, project: Project): void;
    CreateTask(projId: string, task: Partial<Task>): void;
    CreateProject(project: Partial<Project>): void;
    DeleteProject(project: Project): void;

    PausePlayTimer(): void;
    RunTimer(): void;

    SetActiveProject(idx: number): void;
}

export type User = {

}

export type Project = {
    id: string;
    name: string;
    timeSpent: string;
}

export type Task = {
    id?: string
    projectId?: string;
    completed: boolean;
    value: string;
}

export type Pomodoro = {
    remainingTime: string;
    currentStatus: PomodoroStatus;
    currentSession: number;
    totalSessions: number;
    workDuration: string;
    shortBreakDuration: string;
    longBreakDuration: string;
    isRunning: boolean;
    activeProject?: number;
}

export enum PomodoroStatus {
    FOCUS = "FOCUS",
    SHORT_BREAK = "SHORT BREAK",
    LONG_BREAK = "LONG BREAK"
}