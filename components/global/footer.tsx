import { faClockRotateLeft, faForward, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBar from "@ramonak/react-progress-bar";
import { useDb } from "../../context/DbProvider";
import { PomodoroStatus } from "../../types/db";
import { BreakApartTime, CalculateProgress, FormatTime, GetSeconds } from "../../util/time";
export default function Footer() {
    const {db, loading: dbLoading, refreshDb} = useDb();
  
    if (dbLoading) {
      return <h1>Loading...</h1>
    }

    return (
        <footer className="inline-flex flex-col lg:flex-row bottom-0 right-0 left-0 fixed bottom-0 md:left-[4em] dark:bg-gray-800 h-20 lg:h-16">
            <div className="lg:w-4/6 my-auto px-16">
                <ProgressBar 
                    completed={(() => {
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
                    maxCompleted={(() => {
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
                    labelClassName="hidden"
                    bgColor="#ECB365"
                    baseBgColor='#04293A'
                />
            </div>
            <div className="flex lg:w-2/6 justify-end lg:mx-auto lg:justify-between my-auto mx-16">
                <span className="my-auto text-sm text-center mr-auto lg:ml-auto">{db.pomodoro.currentSession} of {db.pomodoro.totalSessions} sessions.</span>
                <div className="my-auto flex flex-row ml-auto lg:mr-auto">
                    <span className="rounded-full border-2 my-auto border-white-100 py-1 px-2 mx-2 text-2xs"><FontAwesomeIcon icon={faClockRotateLeft} /></span>
                    <span onClick={() => {
                        db.PausePlayTimer();
                        refreshDb();
                    }} className="rounded-full border-2 border-lightBlue text-lightBlue py-2 px-3 mx-2 text-2xs"><FontAwesomeIcon icon={db.pomodoro.isRunning ? faPause : faPlay} /></span>
                    <span className="rounded-full border-2 my-auto border-white-100 py-1 px-2 mx-2 text-2xs"><FontAwesomeIcon icon={faForward} /></span>
                </div>
            </div>
        </footer>
    )
}