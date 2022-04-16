import { v4 as uuidv4 } from 'uuid';
import { Db, Pomodoro, PomodoroStatus, Project, Task, User } from "../../types/db";
import { BreakApartTime, IncreaseByTime, SubtractByTime, TimeToString } from '../../util/time';
import PomodoroDefault from "../defaults/pomodoro";
import ProjectDefault from "../defaults/project";
import TaskDefault from "../defaults/task";

export default class LocalStorageDb implements Db {
    private _user: User;
    private _projects: Array<Project>;
    private _tasks: Array<Task>;
    private _pomodoro: Pomodoro;

    public get pomodoro() { return this._pomodoro };
    public set pomodoro(pomodoro) { this._pomodoro = pomodoro; localStorage.setItem('pomodoro', JSON.stringify(pomodoro)) };

    public get tasks() { return this._tasks };
    public set tasks(tasks) { this.tasks = tasks; localStorage.setItem('tasks', JSON.stringify(tasks)) };

    public get projects() { return this._projects };
    public set projects(projects) { this._projects = projects; localStorage.setItem('projects', JSON.stringify(projects)) };

    public get user() { return this._user };
    public set user(user) { this._user = user; localStorage.setItem('user', JSON.stringify(user)) };

    constructor() {
        let pomodoro = JSON.parse(localStorage.getItem('pomodoro')) as Pomodoro;
        let tasks = JSON.parse(localStorage.getItem('tasks')) as Array<Task>;
        let projects = JSON.parse(localStorage.getItem('projects')) as Array<Project>;
        let user = JSON.parse(localStorage.getItem('user')) as User;
        
        if (!pomodoro) {
            console.log('Initializing Pomodoro Settings');
            localStorage.setItem('pomodoro', JSON.stringify(PomodoroDefault))
            pomodoro = PomodoroDefault;
        }
        if (!tasks) {
            console.log('Initializing Tasks');
            localStorage.setItem('tasks', JSON.stringify([TaskDefault]))
            tasks = [TaskDefault];
        }
        if (!projects) {
            console.log('Initializing Projects');
            localStorage.setItem('projects', JSON.stringify([ProjectDefault]))
            projects = [ProjectDefault];
        }

        this._pomodoro = pomodoro;
        this._tasks = tasks;
        this._projects = projects;
        this._user = user;
    }

    UpdatePomodoro(pomodoro: Pomodoro): void {
        this._pomodoro = pomodoro;
        localStorage.setItem('pomodoro', JSON.stringify(this._pomodoro));
    }

    GetProjectTasks(projId: string) {
        return this._tasks.filter((task) => {
            return task.project == projId;
        });
    }

    UpdateTask(taskId: string, task: Task) {
        let updatedTasks = this._tasks.map((uneditedTask: Task) => {
            if (uneditedTask.id == taskId) {
                return task;
            } else {
                return uneditedTask;
            }
        })

        this._tasks = updatedTasks;
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    CreateTask(projectId: string, task: Partial<Task>) {
        this._tasks.push({
            id: uuidv4(),
            project: projectId,
            value: task.value,
            completed: false
        });
        localStorage.setItem('tasks', JSON.stringify(this._tasks))
    }

    UpdateProject(projId: string, project: Project) {
        let updatedProject = this._projects.map((uneditedProject: Project) => {
            if (uneditedProject.id == projId) {
                return project;
            } else {
                return uneditedProject;
            }
        })

        this._projects = updatedProject;
        localStorage.setItem('projects', JSON.stringify(updatedProject))
    }

    CreateProject(project: Partial<Project>) {
        this._projects.push({
            id: uuidv4(),
            name: project.name,
            timeSpent: '00:00:00:00'
        });
        localStorage.setItem('projects', JSON.stringify(this._projects))
    }

    DeleteProject(project: Project) {
        let updatedProjects = this._projects.filter((tmpProject: Project) => {
            return !(tmpProject.id == project.id);
        })

        this._projects = updatedProjects;
        localStorage.setItem('projects', JSON.stringify(updatedProjects))
    }

    PausePlayTimer(): void {
        this._pomodoro.isRunning = !this._pomodoro.isRunning;
        localStorage.setItem('pomodoro', JSON.stringify(this._pomodoro));
    }

    RunTimer(): void {
        // Subtract second from timer.
        let brokenTime = BreakApartTime(this._pomodoro.remainingTime);
        brokenTime = SubtractByTime(
            brokenTime,
            {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 1
            }
        );
        this._pomodoro.remainingTime = TimeToString(brokenTime);
        localStorage.setItem('pomodoro', JSON.stringify(this._pomodoro));

        if (this._pomodoro.currentStatus != PomodoroStatus.FOCUS) return;

        // Add second to project time.
        brokenTime = BreakApartTime(this._projects[this._pomodoro.activeProject].timeSpent);
        brokenTime = IncreaseByTime(
            brokenTime,
            {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 1
            }
        );
        this._projects[this._pomodoro.activeProject].timeSpent = TimeToString(brokenTime);
        localStorage.setItem('projects', JSON.stringify(this._projects));

    }

    SetActiveProject(idx: number): void {
        this._pomodoro.activeProject = idx;
        localStorage.setItem('pomodoro', JSON.stringify(this._pomodoro));
    }
}