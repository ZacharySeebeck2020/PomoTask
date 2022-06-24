import { Task, User } from "./db";

export interface TaskApiResponse {
    task: Task;
    message: string;
}

export interface UserApiResponse {
    user: User;
    message: string;
}