import { Pomodoro, PomodoroStatus } from "../../types/db";

const PomodoroDefault: Pomodoro = {
    remainingTime: '00:00:00:11',
    currentStatus: PomodoroStatus.FOCUS,
    currentSession: 1,
    totalSessions: 4,
    workDuration: '00:00:00:11',
    shortBreakDuration: '00:00:00:12',
    longBreakDuration: '00:00:00:10',
    isRunning: false,
    activeProject: 0
}

export default PomodoroDefault;