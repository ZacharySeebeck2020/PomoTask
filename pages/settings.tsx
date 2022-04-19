import { doesNotMatch } from "assert";
import { useDb } from "../context/DbProvider";
import { Pomodoro, PomodoroStatus } from "../types/db";
import { BreakApartTime } from "../util/time";

export default function Settings() {
    const {db, loading: dbLoading, refreshDb} = useDb();

    let UpdatePomodoroValue = (name: string, value: number) => {
        let updatedPomodoro: Pomodoro = db.pomodoro;
        switch (name) {
            case 'workDuration':
                    updatedPomodoro.workDuration = `00:00:${value}:00`;
                break;
            case 'shortBreakDuration':
                updatedPomodoro.shortBreakDuration = `00:00:${value}:00`;
                break;
            case 'longBreakDuration':
                updatedPomodoro.longBreakDuration = `00:00:${value}:00`;
                break;
            case 'totalSessions':
                updatedPomodoro.totalSessions = value;
                break;
        }
        db.UpdatePomodoro({
            ...updatedPomodoro,
            remainingTime: updatedPomodoro.workDuration,
            currentStatus: PomodoroStatus.FOCUS,
            currentSession: 1,
            isRunning: false
        })
        refreshDb();
    }

    if (dbLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="w-3/6 mx-auto h-full flex flex-col -mt-16 justify-center mb-16">
            <div>
                <label className="label">
                    <span className="label-text">Work Duration</span>
                    <span className="label-text-alt">{BreakApartTime(db.pomodoro.workDuration).minutes} Minutes</span>
                </label>
                <input type="range" min="5" max="60" value={BreakApartTime(db.pomodoro.workDuration).minutes} onChange={(evt) => {UpdatePomodoroValue('workDuration', parseInt(evt.target.value))}} className="range range-xs" step="5"/>
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
                    <span className="label-text-alt">{BreakApartTime(db.pomodoro.shortBreakDuration).minutes} Minutes</span>
                </label>
                <input type="range" min="1" value={BreakApartTime(db.pomodoro.shortBreakDuration).minutes} onChange={(evt) => {UpdatePomodoroValue('shortBreakDuration', parseInt(evt.target.value))}} max="30" className="range range-xs" step="1"/>
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
                    <span className="label-text-alt">{BreakApartTime(db.pomodoro.longBreakDuration).minutes} Minutes</span>
                </label>
                <input type="range" min="1" max="45" value={BreakApartTime(db.pomodoro.longBreakDuration).minutes} onChange={(evt) => {UpdatePomodoroValue('longBreakDuration', parseInt(evt.target.value))}} className="range range-xs" step="1"/>
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
                    <span className="label-text-alt">{db.pomodoro.totalSessions} Sessions</span>
                </label>
                <input type="range" min="2" value={db.pomodoro.totalSessions} onChange={(evt) => {UpdatePomodoroValue('totalSessions', parseInt(evt.target.value))}} max="15" className="range range-xs" step="1"/>
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
    )
}