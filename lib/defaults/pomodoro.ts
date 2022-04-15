import { Pomodoro, PomodoroStatus } from "../../types/db";

const PomodoroDefault: Pomodoro = {
    remainingTime: 25 * 60,
    currentStatus: PomodoroStatus.FOCUS,
    currentSession: 1,
    totalSessions: 4,
    workDuration: 25 * 60,
    shortBreakDuration: 5 * 60,
    longBreakDuration: 20 * 60,
    isRunning: false
}

export default PomodoroDefault;