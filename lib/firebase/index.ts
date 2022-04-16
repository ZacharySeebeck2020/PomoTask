import { Db, Pomodoro, Project, Task, User } from "../../types/db";

export default class FirebaseDb {
    private _user: User;
    private _projects: Array<Project>;
    private _tasks: Array<Task>;
    private _pomodoro: Pomodoro;

    public get pomodoro() { return this._pomodoro };
    public set pomodoro(pomodoro) { this._pomodoro = pomodoro };

    constructor() {
        
    }
}