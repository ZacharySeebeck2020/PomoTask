import { faCheck, faClockRotateLeft, faForward, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import { Task, User } from '../types/db';
import { BreakApartTime, CalculateProgress, FormatTime, GetSeconds } from '../util/time'
import prisma from '../lib/prisma';
import { Session } from 'next-auth';
import { PlayPauseTimer, SetActiveProject, UpdateTaskComplete } from '../util/Apis';
import { useTimer } from '../context/TimerProvider';

export default function Home({ user, session }: { user: User, session: Session }) {
  const [userObj, setUserObj] = useState(user);
  const { timer, setUserObj: setTimerUserObj, projectTimeSpent} = useTimer();

  useEffect(() => {
    setTimerUserObj(userObj);
  }, [userObj])
  
  return (
    <div className="w-full h-full flex flex-col sm:flex-row justify-center">
      <div className="hidden md:flex mx-auto justify-center items-center min-h-screen">
        <div className="h-auto w-96 bg-lightBlue rounded-lg p-4">
          <div className="mt-3 text-sm text-[#8ea6c8] flex justify-between items-center">
            <p className="set_date">Selected Project</p>
            <p className="set_time">Time Spent: ({FormatTime(projectTimeSpent)})</p>
          </div>
          <p className="text-xl font-semibold mt-2 text-white">{userObj.activeProject.name}</p>
          <ul className="my-4 h-[60vh] overflow-y-auto scrollbar pr-2">
            <li className=" mt-4" id="1">
              <div className="flex gap-2 flex-col-reverse">
                { userObj.activeProject.tasks?.map((task: Task) => {
                  return (
                      <div key={`tasksProj${userObj.activeProject.id}Task${task.id}`} className="w-full h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3">
                          <span 
                            onClick={async () => { setUserObj(await UpdateTaskComplete(task.id, !task.completed, userObj)); }} 
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
          onChange={async (evt) => setUserObj(await SetActiveProject(evt, userObj))} 
          className="select w-full max-w-xs mx-auto mb-5"
        >
          {userObj.projects.map((project) => {
            return (<option value={project.id} key={`projectSelector${project.id}`}>{project.name}</option>)
          })}
        </select>
        <div className="mx-auto w-96">
          <CircularProgressbarWithChildren
            value={(() => {
              switch (userObj.pomodoro.currentStatus) {
                case "FOCUS":
                    return CalculateProgress( BreakApartTime(userObj.pomodoro.workDuration), BreakApartTime(timer) );
                  break;

                case "SHORT BREAK":
                    return CalculateProgress( BreakApartTime(userObj.pomodoro.shortBreakDuration), BreakApartTime(timer) );
                  break;

                case "LONG BREAK":
                    return CalculateProgress( BreakApartTime(userObj.pomodoro.longBreakDuration), BreakApartTime(timer) );
                  break;
              }
            })()}
            maxValue={(() => {
              switch (userObj.pomodoro.currentStatus) {
                case "FOCUS":
                    return GetSeconds(BreakApartTime(userObj.pomodoro.workDuration));
                  break;

                case "SHORT BREAK":
                    return GetSeconds(BreakApartTime(userObj.pomodoro.shortBreakDuration));
                  break;

                case "LONG BREAK":
                    return GetSeconds(BreakApartTime(userObj.pomodoro.longBreakDuration));
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
              <strong className="text-5xl">{FormatTime(timer)}</strong>
              <span className="text-2xl uppercase font-bold mt-5">{userObj.pomodoro.currentStatus}</span>
            </div>
          </CircularProgressbarWithChildren >
        </div>
        <div className="mx-auto mt-5 flex flex-row justify-between">
          <span className="rounded-full border-2 my-auto border-white-100 py-2 px-3 mx-2"><FontAwesomeIcon icon={faClockRotateLeft} /></span>
          <span onClick={async () => setUserObj(await PlayPauseTimer(userObj))} className="rounded-full border-2 border-lightBlue text-lightBlue py-4 px-5 mx-2"><FontAwesomeIcon icon={userObj.pomodoro.isRunning ? faPause : faPlay} /></span>
          <span className="rounded-full border-2 my-auto border-white-100 py-2 px-3 mx-2"><FontAwesomeIcon icon={faForward} /></span>
        </div>
        <div className="mx-auto mt-5 flex flex-col text-center text-sm">
          <span>{userObj.pomodoro.currentSession} of {userObj.pomodoro.totalSessions}</span>
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
