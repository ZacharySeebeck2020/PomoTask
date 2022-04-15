import { Db, Pomodoro, Projects, Tasks, User } from "../../types/db";

export default class FirebaseDb implements Db {
    private _user: User;
    private _projects: Projects;
    private _tasks: Tasks;
    private _pomodoro: Pomodoro;

    public get pomodoro() { return this._pomodoro };
    public set pomodoro(pomodoro) { this._pomodoro = pomodoro };

    constructor() {
        
    }
}