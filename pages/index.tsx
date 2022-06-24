import { faFortAwesome } from '@fortawesome/free-brands-svg-icons';
import { faCaretDown, faCheck, faClockRotateLeft, faForward, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSession } from 'next-auth/react';
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import { useDb } from '../context/DbProvider';
import styles from '../styles/Home.module.css'
import { PomodoroStatus, Task, User } from '../types/db';
import { BreakApartTime, CalculateProgress, FormatTime, GetSeconds } from '../util/time'

import prisma from '../lib/prisma';
import { Session } from 'next-auth';
import { TaskApiResponse, UserApiResponse } from '../types/api';

export default function Home({ user, session }: { user: User, session: Session }) {
  const {db, loading: dbLoading, refreshDb} = useDb();
  const [userObj, setUserObj] = useState<User>(user);

  useEffect(() => {
    if (dbLoading) return;
    
    if (db.pomodoro.activeProject == -1) {
      db.SetActiveProject(0);
      refreshDb();
    }
  }, [db, refreshDb, dbLoading])

  if (dbLoading) {
    return <h1>Loading...</h1>
  }

  if (db.pomodoro.activeProject == -1) {
    return (<></>);
  }

  async function UpdateTaskComplete(taskId: string, isComplete: boolean) {
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

    setUserObj(tmpUserObj);
  }

  async function UpdateActiveProject(evt: React.ChangeEvent<HTMLSelectElement>) {
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

    setUserObj(tmpUserObj);
  }

  return (
    <div className="w-full h-full flex flex-col sm:flex-row justify-center">

      <div className="hidden md:flex mx-auto justify-center items-center min-h-screen">
        <div className="h-auto w-96 bg-lightBlue rounded-lg p-4">
          <div className="mt-3 text-sm text-[#8ea6c8] flex justify-between items-center">
            <p className="set_date">Selected Project</p>
            <p className="set_time">Time Spent Today: ({FormatTime(userObj.activeProject.timeSpent)})</p>
          </div>
          <p className="text-xl font-semibold mt-2 text-white">{userObj.activeProject.name}</p>
          <ul className="my-4 h-[60vh] overflow-y-auto scrollbar pr-2">
            <li className=" mt-4" id="1">
              <div className="flex gap-2 flex-col-reverse">
                { userObj.activeProject.tasks?.map((task: Task) => {
                  return (
                      <div key={`tasksProj${userObj.activeProject.id}Task${task.id}`} className="w-full h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3">
                          <span 
                            onClick={() => { UpdateTaskComplete(task.id, !task.completed); }} 
                            className={`${task.completed ? 'bg-green-500' : 'bg-white' } w-7 h-7 rounded-full border border-white transition-all cursor-pointer hover:border-[#36d344] flex justify-center items-center`}
                          >
                              <FontAwesomeIcon className="text-white" icon={faCheck} />
                          </span>
                          <span className={`${task.completed ? 'line-through' : '' } text-sm ml-4 text-[#5b7a9d] font-semibold`}>{task.value}</span>
                      </div>
                    )
                  }
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="ml-auto mx-auto h-full flex flex-col justify-center">
        <select 
          value={userObj.activeProject.id} 
          disabled={userObj.pomodoro.isRunning} 
          onChange={UpdateActiveProject} 
          className="select w-full max-w-xs mx-auto mb-5"
        >
          {userObj.projects.map((project) => {
            return (<option value={project.id} key={`projectSelector${project.id}`}>{project.name}</option>)
          })}
        </select>
        <div className="mx-auto w-96">
          <CircularProgressbarWithChildren
            value={(() => {
              switch (db.pomodoro.currentStatus) {
                case PomodoroStatus.FOCUS:
                    return CalculateProgress( BreakApartTime(db.pomodoro.workDuration), BreakApartTime(db.pomodoro.remainingTime) );
                  break;

                case PomodoroStatus.SHORT_BREAK:
                    return CalculateProgress( BreakApartTime(db.pomodoro.shortBreakDuration), BreakApartTime(db.pomodoro.remainingTime) );
                  break;

                case PomodoroStatus.LONG_BREAK:
                    return CalculateProgress( BreakApartTime(db.pomodoro.longBreakDuration), BreakApartTime(db.pomodoro.remainingTime) );
                  break;
              
                default:
                  break;
              }
            })()}
            maxValue={(() => {
              switch (db.pomodoro.currentStatus) {
                case PomodoroStatus.FOCUS:
                    return GetSeconds(BreakApartTime(db.pomodoro.workDuration));
                  break;

                case PomodoroStatus.SHORT_BREAK:
                    return GetSeconds(BreakApartTime(db.pomodoro.shortBreakDuration));
                  break;

                case PomodoroStatus.LONG_BREAK:
                    return GetSeconds(BreakApartTime(db.pomodoro.longBreakDuration));
                  break;
              
                default:
                  break;
              }
            })()}
            styles={buildStyles({
              strokeLinecap: 'round',
              textSize: '20px',
              pathTransitionDuration: 0.5,
              pathColor: `#ECB365`,
              textColor: '#fff',
              trailColor: '#04293A',
              backgroundColor: '#04293A',
            })}
          >
            <div className="flex flex-col text-center">
              <strong className="text-5xl">{FormatTime(db.pomodoro.remainingTime)}</strong>
              <span className="text-2xl uppercase font-bold mt-5">{db.pomodoro.currentStatus}</span>
            </div>
          </CircularProgressbarWithChildren >
        </div>
        <div className="mx-auto mt-5 flex flex-row justify-between">
          <span className="rounded-full border-2 my-auto border-white-100 py-2 px-3 mx-2"><FontAwesomeIcon icon={faClockRotateLeft} /></span>
          <span onClick={() => {
            db.PausePlayTimer();
            refreshDb();
          }} className="rounded-full border-2 border-lightBlue text-lightBlue py-4 px-5 mx-2"><FontAwesomeIcon icon={db.pomodoro.isRunning ? faPause : faPlay} /></span>
          <span className="rounded-full border-2 my-auto border-white-100 py-2 px-3 mx-2"><FontAwesomeIcon icon={faForward} /></span>
        </div>
        <div className="mx-auto mt-5 flex flex-col text-center text-sm">
          <span>{db.pomodoro.currentSession} of {db.pomodoro.totalSessions}</span>
          <span>sessions</span>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session: Session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    };
  }
  
  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id
    },
    include: {
      projects: {
        include: {
          tasks: true
        }
      },
      activeProject: {
        include: {
          tasks: true
        }
      },
      pomodoro: true
    }
  });

  return {
    props: {
      user: user,
      session: session,
    }
  }
}
