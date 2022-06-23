import { Pomodoro, PomodoroStatus } from "../../types/db";

const PomodoroDefault: Pomodoro = {
    remainingTime: '00:00:25:00',
    currentStatus: PomodoroStatus.FOCUS,
    currentSession: 1,
    totalSessions: 4,
    workDuration: '00:00:25:00',
    shortBreakDuration: '00:00:05:00',
    longBreakDuration: '00:00:20:00',
    isRunning: false,
}

export default PomodoroDefault;