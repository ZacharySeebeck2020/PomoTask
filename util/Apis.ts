import { PomodoroApiResponse, ProjectApiResponse, TaskApiResponse, UserApiResponse } from "../types/api";
import { Project, Task, User } from "../types/db";

export async function UpdateTaskComplete(taskId: string, isComplete: boolean, userObj: User) {
    let tmpUserObj: User = { ...userObj };

    for (let index = 0; index < tmpUserObj.activeProject.tasks.length; index++) {
        const task: Task = tmpUserObj.activeProject.tasks[index];
        if (task.id != taskId) continue;

        let res = await fetch(`/api/projects/${tmpUserObj.activeProject.id}/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: isComplete
            })
        });

        const jsonResponse: TaskApiResponse = await res.json();

        if (res.status == 200) tmpUserObj.activeProject.tasks[index] = jsonResponse.task;
        else console.log(jsonResponse.message);
    }

    return tmpUserObj
}

export async function UpdateProject(projectId: string, updatedProject: Partial<Project>, userObj: User) {
    let tmpUserObj: User = { ...userObj };

    for (let index = 0; index < tmpUserObj.projects.length; index++) {
        const project: Project = tmpUserObj.projects[index];
        if (project.id != projectId) continue;

        let res = await fetch(`/api/projects/${project.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProject)
        });

        const jsonResponse: ProjectApiResponse = await res.json();

        if (res.status == 200) tmpUserObj.projects[index] = jsonResponse.project;
        else console.log(jsonResponse.message);
    }

    return tmpUserObj
}

export async function SetActiveProject(evt: React.ChangeEvent<HTMLSelectElement>, userObj: User) {
    let tmpUserObj: User = { ...userObj };
    let newActiveProjectId = evt.target.value;

    let res = await fetch(`/api/user/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            activeProjectId: newActiveProjectId
        })
    });

    const jsonResponse: UserApiResponse = await res.json();

    if (res.status == 200) tmpUserObj = jsonResponse.user;
    else console.log(jsonResponse.message);

    return tmpUserObj;
}

export async function PlayPauseTimer(userObj: User) {
    let tmpUserObj: User = { ...userObj };

    let res = await fetch(`/api/pomodoro/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            isRunning: !tmpUserObj.pomodoro.isRunning
        })
    });

    const jsonResponse: PomodoroApiResponse = await res.json();

    if (res.status == 200) tmpUserObj.pomodoro = jsonResponse.pomodoro;
    else console.log(jsonResponse.message);

    return tmpUserObj
}

export async function UpdatePomodoro(userObj: User) {
    let tmpUserObj: User = { ...userObj };

    let res = await fetch(`/api/pomodoro/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...tmpUserObj.pomodoro
        })
    });

    const jsonResponse: PomodoroApiResponse = await res.json();

    if (res.status == 200) tmpUserObj.pomodoro = jsonResponse.pomodoro;
    else console.log(jsonResponse.message);

    return tmpUserObj
}