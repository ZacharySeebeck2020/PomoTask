import { Db, Pomodoro, Projects, Tasks, User } from "../../types/db";
import PomodoroDefault from "../defaults/pomodoro";

export default class LocalStorageDb implements Db {
    private _user: User;
    private _projects: Projects;
    private _tasks: Tasks;
    private _pomodoro: Pomodoro;

    public get pomodoro() { return this._pomodoro };
    public set pomodoro(pomodoro) { this._pomodoro = pomodoro };

    constructor() {
        let pomodoro = JSON.parse(localStorage.getItem('pomodoro')) as Pomodoro;
        let tasks = JSON.parse(localStorage.getItem('tasks')) as Tasks;
        let projects = JSON.parse(localStorage.getItem('projects')) as Projects;
        let user = JSON.parse(localStorage.getItem('user')) as User;

        console.log(pomodoro);
        console.log('hi');
        
        if (!pomodoro) {
            console.log('Initializing Pomodoro Settings');
            localStorage.setItem('pomodoro', JSON.stringify(PomodoroDefault))
            pomodoro = PomodoroDefault;
        }

        this._pomodoro = pomodoro;
        this._tasks = tasks;
        this._projects = projects;
        this._user = user;
    }
}