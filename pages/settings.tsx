import { doesNotMatch } from "assert";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Footer from "../components/global/footer";
import { useDb } from "../context/DbProvider";
import { useTimer } from "../context/TimerProvider";
import { useUser } from "../context/UserProvider";
import prisma from "../lib/prisma";
import { Pomodoro, PomodoroStatus, User } from "../types/db";
import { UpdatePomodoro } from "../util/Apis";
import { BreakApartTime } from "../util/time";

export default function Settings({ user, session }: { user: User, session: Session}) {
    const { userObj, setUserObj } = useUser();
    const [ debounceTimeoutId, setDebounceTimeoutId ] = useState<Timeout>();
    const [ pomodoroSettings, setPomodoroSettings ] = useState(user.pomodoro);

    useEffect(() => {
        setUserObj(user);
    }, []);

    if (!userObj) return <></>

    let UpdatePomodoroValue = (name: string, value: number) => {
        setPomodoroSettings((pomodoroSettings) => {
            switch (name) {
                case 'workDuration':
                        pomodoroSettings.workDuration = `00:00:${value}:00`;
                    break;
                case 'shortBreakDuration':
                    pomodoroSettings.shortBreakDuration = `00:00:${value}:00`;
                    break;
                case 'longBreakDuration':
                    pomodoroSettings.longBreakDuration = `00:00:${value}:00`;
                    break;
                case 'totalSessions':
                    pomodoroSettings.totalSessions = value;
                    break;
            }

            if (debounceTimeoutId) {
                clearTimeout(debounceTimeoutId);
            }

            setDebounceTimeoutId( 
                setTimeout(async () => {
                    setUserObj(
                        await UpdatePomodoro({
                            ...pomodoroSettings,
                            remainingTime: pomodoroSettings.workDuration,
                            currentStatus: 'FOCUS',
                            currentSession: 1,
                            isRunning: false
                        }, userObj)
                    );

                }, 500) 
            );   
            
            return pomodoroSettings;
        })
    }


    return (
        <>
            <div className="w-3/6 mx-auto h-full flex flex-col -mt-16 justify-center mb-16">
                <h1 className="text-center text-sm mb-5 text-gray-500">Changing Settings Will Reset The Timer</h1>
                <div>
                    <label className="label">
                        <span className="label-text">Work Duration</span>
                        <span className="label-text-alt">{BreakApartTime(pomodoroSettings.workDuration).minutes} Minutes</span>
                    </label>
                    <input type="range" min="5" max="60" value={BreakApartTime(pomodoroSettings.workDuration).minutes} onChange={(evt) => {UpdatePomodoroValue('workDuration', parseInt(evt.target.value))}} className="range range-xs" step="5"/>
                    <div className="w-full flex justify-between text-xs px-2">
                        {(() => {
                            let elements = [];
                            for (let index = 0; index < 12; index++) {
                                if (index == 0) elements.push((<span className="text-center ml-[-1.3em]">| <br/> 5 Min</span>));
                                else if (index == 4) elements.push((<span className="text-center ml-[-1.1em]">| <br/> 25 Min</span>));
                                else if (index == 11) elements.push((<span className="text-center mr-[-1.6em]">| <br/> 60 Min</span>));
                                else elements.push((<span></span>))
                            }
                            return elements;
                        })()}
                    </div>
                </div>

                <div className="mt-3">
                    <label className="label">
                        <span className="label-text">Short Break</span>
                        <span className="label-text-alt">{BreakApartTime(pomodoroSettings.shortBreakDuration).minutes} Minutes</span>
                    </label>
                    <input type="range" min="1" value={BreakApartTime(pomodoroSettings.shortBreakDuration).minutes} onChange={(evt) => {UpdatePomodoroValue('shortBreakDuration', parseInt(evt.target.value))}} max="30" className="range range-xs" step="1"/>
                    <div className="w-full flex justify-between text-xs px-2">
                        {(() => {
                            let elements = [];
                            for (let index = 0; index < 30; index++) {
                                if (index == 0) elements.push((<span className="text-center ml-[-1.3em]">| <br/> 1 Min</span>));
                                else if (index == 4) elements.push((<span className="text-center ml-[-2em]">| <br/> 5 Min</span>));
                                else if (index == 29) elements.push((<span className="text-center mr-[-1.6em]">| <br/> 30 Min</span>));
                                else elements.push((<span></span>))
                            }
                            return elements;
                        })()}
                    </div>
                </div>

                <div className="mt-3">
                    <label className="label">
                        <span className="label-text">Long Break</span>
                        <span className="label-text-alt">{BreakApartTime(pomodoroSettings.longBreakDuration).minutes} Minutes</span>
                    </label>
                    <input type="range" min="1" max="45" value={BreakApartTime(pomodoroSettings.longBreakDuration).minutes} onChange={(evt) => {UpdatePomodoroValue('longBreakDuration', parseInt(evt.target.value))}} className="range range-xs" step="1"/>
                    <div className="w-full flex justify-between text-xs px-2">
                        {(() => {
                            let elements = [];
                            for (let index = 0; index < 45; index++) {
                                if (index == 0) elements.push((<span className="text-center ml-[-1.3em]">| <br/> 5 Min</span>));
                                else if (index == 19) elements.push((<span className="text-center ml-[-0.3em]">| <br/> 20 Min</span>));
                                else if (index == 44) elements.push((<span className="text-center mr-[-1.6em]">| <br/> 45 Min</span>));
                                else elements.push((<span></span>))
                            }
                            return elements;
                        })()}
                    </div>
                </div>

                <div className="mt-3">
                    <label className="label">
                        <span className="label-text">Sessions</span>
                        <span className="label-text-alt">{pomodoroSettings.totalSessions} Sessions</span>
                    </label>
                    <input type="range" min="2" value={pomodoroSettings.totalSessions} onChange={(evt) => {UpdatePomodoroValue('totalSessions', parseInt(evt.target.value))}} max="15" className="range range-xs" step="1"/>
                    <div className="w-full flex justify-between text-xs px-2">
                        {(() => {
                            let elements = [];
                            for (let index = 0; index < 13; index++) {
                                if (index == 0) elements.push((<span className="text-center ml-[-0.3em]">| <br/> 2</span>));
                                else if (index == 2) elements.push((<span className="text-center ml-[-1.3em]">| <br/> 4</span>));
                                else if (index == 12) elements.push((<span className="text-center mr-[-0.6em]">| <br/> 15</span>));
                                else elements.push((<span></span>))
                            }
                            return elements;
                        })()}
                    </div>
                </div>
            </div>
            <Footer user={userObj} />
        </>
    )
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
  