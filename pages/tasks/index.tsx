import { faCheck, faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDb } from "../../context/DbProvider";

export default function Index() {
    const {db, loading: dbLoading, refreshDb} = useDb();
    const [newTaskString, setNewTaskString] = useState<string>('');
    const [projectTitle, setProjectTitle] = useState<string>('');
    const [isEditingProject, setIsEditingProject] = useState<boolean>(false);

    useEffect(() => {
        if (!dbLoading) {
            setProjectTitle(db.pomodoro.activeProject == -1 ? '' : db.projects[db.pomodoro.activeProject].name);
        }
    }, [db, dbLoading])

    if (dbLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="flex flex-col">
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-4">
                <ul className="flex -mb-px overflow-x-auto">
                    {db.projects.map((project, idx) => {
                        return (
                            <li key={`projSelector${idx}`} className="mr-2">
                                <a href="#" className={
                                    'inline-block p-4 rounded-t-lg border-b-2 ' +
                                    (db.pomodoro.activeProject == idx ? 
                                        'text-blue-500 border-blue-500' :
                                        'border-transparent hover:text-gray-600 hover:text-gray-300'
                                    )
                                } onClick={() => {db.SetActiveProject(idx); refreshDb();}} aria-current="page">{project.name}</a>
                            </li>
                        );
                    })}

                    <li className="ml-auto">
                        <a href="#" onClick={() => {
                            db.SetActiveProject(-1);
                            refreshDb();
                            setIsEditingProject(true);
                        }} className={
                            'inline-block p-4 rounded-t-lg border-b-2 ' +
                            (db.pomodoro.activeProject == -1 ? 
                                'text-blue-500 border-blue-500' :
                                'border-transparent hover:text-gray-600 hover:text-gray-300'
                            )
                        }>Create New Project</a>
                    </li>
                </ul>
            </div>

            <div className="flex flex-row mb-4 mx-16">
                {isEditingProject ? (
                    <div className="w-full flex flex-row">
                        <input value={projectTitle} onChange={(event) => {setProjectTitle(event.target.value)}} className="input w-full mr-4"/>
                        <button className="btn btn-success ml-auto" onClick={() => {
                            if (projectTitle == '') {
                                alert('Must have project title!');
                                return;
                            } 
                            if (db.pomodoro.activeProject != -1) {
                                db.UpdateProject(db.projects[db.pomodoro.activeProject].id, {...db.projects[db.pomodoro.activeProject], name: projectTitle});
                                refreshDb();
                                setIsEditingProject(false);
                            } else {
                                db.CreateProject({name: projectTitle});
                                refreshDb();
                                db.SetActiveProject(db.projects.length - 1);
                                refreshDb();
                                setIsEditingProject(false);
                            }
                        }}>Save</button>
                        <button className="btn btn-error ml-4" onClick={() => {
                            if (db.pomodoro.activeProject != -1) {
                                setIsEditingProject(false);
                            } else {
                                db.SetActiveProject(0);
                                refreshDb();
                                setIsEditingProject(false);
                            }
                        }}>Cancel</button>
                        <FontAwesomeIcon className="text-sm my-auto mr-4 cursor-pointer ml-4" icon={faTrash} onClick={() => {
                            if(!confirm('Are you sure you want to delete this project?')) {
                                return;
                            }

                            if (db.projects.length == 1) {
                                alert('Must have at least one project.');
                                return;
                            }

                            db.DeleteProject(db.projects[db.pomodoro.activeProject])
                            db.SetActiveProject(0);
                            refreshDb();
                            setIsEditingProject(false);
                        }} />
                    </div>
                ) : (
                    <h2 className="text-xl flex flex-row">
                        <FontAwesomeIcon className="text-sm my-auto mr-4 cursor-pointer" icon={faPencil} onClick={() => {setIsEditingProject(true)}} /> {db.projects[db.pomodoro.activeProject].name}
                    </h2>
                )}
            </div>

            <div className={`flex flex-row mx-16 ${isEditingProject ? 'opacity-50 select-none pointer-events-none' : ''}`}> {/* opacity-50 select-none pointer-events-none : For editing title */}
                <div className="mx-auto flex justify-center items-center w-2/6">
                    <div className="h-auto w-96 bg-lightBlue rounded-lg p-4">
                        <p className="text-xl font-semibold mt-2 text-white">Tasks</p>
                        <ul className="my-4 h-[60vh] overflow-y-auto scrollbar pr-2">
                            <li className=" mt-4" id="1">
                                <div className="flex gap-2">
                                    <div className="w-full h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3">
                                        <input value={newTaskString} onChange={(event) => {setNewTaskString(event.target.value)}} className="input h-10 text-white w-full mr-6" placeholder="Add New Task"></input>
                                        <span 
                                            onClick={() => {
                                                db.CreateTask(db.projects[db.pomodoro.activeProject].id, {
                                                    value: newTaskString
                                                });
                                                refreshDb();
                                                setNewTaskString('');
                                            }} 
                                            id="check1" 
                                            className="ml-auto bg-green-500 w-9 h-7 bg-white rounded-full border border-white transition-all cursor-pointer hover:border-[#36d344] flex justify-center items-center"
                                        >
                                            <FontAwesomeIcon className="text-white" icon={faPlus} />
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li className="mt-4" id="1">
                                <div className="flex gap-2 flex-col-reverse">
                                        {db.pomodoro.activeProject != -1 ? db.GetProjectTasks(db.projects[db.pomodoro.activeProject].id).map((task) => {
                                            return (
                                                <div key={`tasksProj${db.projects[db.pomodoro.activeProject].id}Task${task.id}`} className="w-full h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3">
                                                    <span onClick={() => {
                                                        db.UpdateTask(task.id, {...task, completed: !task.completed});
                                                        refreshDb();
                                                    }} className={`${task.completed ? 'bg-green-500' : '' } w-7 h-7 bg-white rounded-full border border-white transition-all cursor-pointer hover:border-[#36d344] flex justify-center items-center`}>
                                                        <FontAwesomeIcon className="text-white" icon={faCheck} />
                                                    </span>
                                                    <span className={`${task.completed ? 'line-through' : '' } text-sm ml-4 text-[#5b7a9d] font-semibold`}>{task.value}</span>
                                                </div>
                                            )
                                        }) : (<></>)}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col w-4/6 mr-16">
                    <div>
                        
                    </div>
                </div>
            </div>

        </div>
    )
}