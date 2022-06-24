import { Pomodoro, Project, Task, User } from "./db";

export interface TaskApiResponse {
    task: Task;
    message: string;
}

export interface UserApiResponse {
    user: User;
    message: string;
}

export interface PomodoroApiResponse {
    pomodoro: Pomodoro,
    message: string;
}

export interface ProjectApiResponse {
    project: Project,
    message: string;
}