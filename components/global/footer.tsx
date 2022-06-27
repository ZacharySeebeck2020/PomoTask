import { faClockRotateLeft, faForward, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";
import { useDb } from "../../context/DbProvider";
import { useTimer } from "../../context/TimerProvider";
import { useUser } from "../../context/UserProvider";
import { PomodoroStatus, User } from "../../types/db";
import { PlayPauseTimer } from "../../util/Apis";
import { BreakApartTime, CalculateProgress, FormatTime, GetSeconds } from "../../util/time";

export default function Footer() {
  const { userObj, setUserObj } = useUser();

  if ( !userObj ) return <></>

  return (
    <footer className="inline-flex flex-col lg:flex-row bottom-0 right-0 left-0 fixed md:left-[4em] dark:bg-gray-800 lg:h-16">
      <span className="ml-5 lg:my-auto text-center my-2">{FormatTime(userObj.pomodoro.remainingTime)}</span>
      <div className="lg:w-4/6 my-auto px-8">
        <ProgressBar
          completed={(() => {
            switch (userObj.pomodoro.currentStatus) {
              case 'FOCUS':
                return CalculateProgress(BreakApartTime(userObj.pomodoro.workDuration), BreakApartTime(userObj.pomodoro.remainingTime));
                break;

              case "SHORT BREAK":
                return CalculateProgress(BreakApartTime(userObj.pomodoro.shortBreakDuration), BreakApartTime(userObj.pomodoro.remainingTime));
                break;

              case 'LONG BREAK':
                return CalculateProgress(BreakApartTime(userObj.pomodoro.longBreakDuration), BreakApartTime(userObj.pomodoro.remainingTime));
                break;

              default:
                break;
            }
          })()}
          maxCompleted={(() => {
            switch (userObj.pomodoro.currentStatus) {
              case 'FOCUS':
                return GetSeconds(BreakApartTime(userObj.pomodoro.workDuration));
                break;

              case 'SHORT BREAK':
                return GetSeconds(BreakApartTime(userObj.pomodoro.shortBreakDuration));
                break;

              case 'LONG BREAK':
                return GetSeconds(BreakApartTime(userObj.pomodoro.longBreakDuration));
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
      <div className="flex lg:w-2/6 justify-end lg:mx-auto lg:justify-between lg:my-auto my-3 mx-16">
        <span className="my-auto text-sm text-center mr-auto lg:ml-auto">{userObj.pomodoro.currentSession} of {userObj.pomodoro.totalSessions} sessions.</span>
        <div className="my-auto flex flex-row ml-auto lg:mr-auto">
          <span className="rounded-full border-2 my-auto border-white-100 py-1 px-2 mx-2 text-2xs"><FontAwesomeIcon icon={faClockRotateLeft} /></span>
          <span onClick={async () => setUserObj(await PlayPauseTimer(userObj)) } className="rounded-full border-2 border-lightBlue text-lightBlue py-2 px-3 mx-2 text-2xs"><FontAwesomeIcon icon={userObj.pomodoro.isRunning ? faPause : faPlay} /></span>
          <span className="rounded-full border-2 my-auto border-white-100 py-1 px-2 mx-2 text-2xs"><FontAwesomeIcon icon={faForward} /></span>
        </div>
      </div>
    </footer>
  )
}