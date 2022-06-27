import { Db, Pomodoro, Project, Task, User } from "../../types/db";

export default class MySQLDb implements Db {
    private _user: User;
    private _projects: Array<Project>;
    private _tasks: Array<Task>;
    private _pomodoro: Pomodoro;

    public get pomodoro() { return this._pomodoro };
    public set pomodoro(pomodoro) { 
        this._pomodoro = pomodoro; 
        localStorage.setItem('pomodoro', JSON.stringify(pomodoro)) 
    };

    public get tasks() { return this._tasks };
    public set tasks(tasks) {
        this.tasks = tasks; 
        localStorage.setItem('tasks', JSON.stringify(tasks)) 
    };

    public get projects() { return this._projects };
    public set projects(projects) { 
        this._projects = projects; 
        localStorage.setItem('projects', JSON.stringify(projects)) 
    };

    public get user() { return this._user };
    public set user(user) { 
        this._user = user; 
        localStorage.setItem('user', JSON.stringify(user)) 
    };

    constructor(userId: string) { 

    }

    UpdatePomodoro(pomodoro: Pomodoro): void {}

    GetProjectTasks(projId: string): Array<Task> { return []; }
    
    UpdateTask(taskId: string, task: Task): void {}
    
    UpdateProject(projectId: string, project: Project): void {}

    CreateTask(projId: string, task: Partial<Task>): void {}

    CreateProject(project: Partial<Project>): void {}

    DeleteProject(project: Project): void {}

    PausePlayTimer(): void {}

    RunTimer(): void {}

    SetActiveProject(idx: number): void {}

}
