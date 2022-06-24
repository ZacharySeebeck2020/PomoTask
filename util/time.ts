export function FormatTime(time: string): string {
    let tmpTime: Time = BreakApartTime(time);
    let formattedTime: string = '';
    if (tmpTime.days != 0) formattedTime += `${tmpTime.days.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:`
    if (tmpTime.hours != 0) formattedTime += `${tmpTime.hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:`
    formattedTime += `${tmpTime.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${tmpTime.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`
    
    return formattedTime;
}

export function BreakApartTime(time: string): Time {
    const brokenTime = time.split(':');
    return {
        days: parseInt(brokenTime[0]),
        hours: parseInt(brokenTime[1]),
        minutes: parseInt(brokenTime[2]),
        seconds: parseInt(brokenTime[3]),
    }
}

export function IncreaseByTime(startingTime: Time, addedTime: Time): Time {
    let newTime: Time = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    }

    startingTime.hours += startingTime.days * 24;
    startingTime.minutes += startingTime.hours * 60;
    startingTime.seconds += startingTime.minutes * 60;
    let durationMilli = startingTime.seconds * 1000;

    addedTime.hours += addedTime.days * 24;
    addedTime.minutes += addedTime.hours * 60;
    addedTime.seconds += addedTime.minutes * 60;
    let remainingMilli = addedTime.seconds * 1000;

    newTime.seconds = ((durationMilli + remainingMilli) / 1000);
    newTime.minutes = (newTime.seconds / 60) | 0;
    newTime.seconds = newTime.seconds % 60;

    newTime.hours = (newTime.minutes / 60) | 0;
    newTime.minutes = (newTime.minutes % 60);

    newTime.days = (newTime.hours / 24) | 0;
    newTime.hours = (newTime.hours % 24);

    return newTime;
}

export function SubtractByTime(startingTime: Time, subtractedTime: Time): Time {
    let newTime: Time = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    }

    startingTime.hours += startingTime.days * 24;
    startingTime.minutes += startingTime.hours * 60;
    startingTime.seconds += startingTime.minutes * 60;
    let durationMilli = startingTime.seconds * 1000;

    subtractedTime.hours += subtractedTime.days * 24;
    subtractedTime.minutes += subtractedTime.hours * 60;
    subtractedTime.seconds += subtractedTime.minutes * 60;
    let remainingMilli = subtractedTime.seconds * 1000;

    newTime.seconds = ((durationMilli - remainingMilli) / 1000);
    newTime.minutes = (newTime.seconds / 60) | 0;
    newTime.seconds = newTime.seconds % 60;

    newTime.hours = (newTime.minutes / 60) | 0;
    newTime.minutes = (newTime.minutes % 60);

    newTime.days = (newTime.hours / 24) | 0;
    newTime.hours = (newTime.hours % 24);

    return newTime;
}

export function CalculateProgress(duration: Time, remaining: Time): number {
    duration.hours += duration.days * 24;
    duration.minutes += duration.hours * 60;
    duration.seconds += duration.minutes * 60;
    let durationDate = new Date(duration.seconds * 1000);
   
    remaining.hours += remaining.days * 24;
    remaining.minutes += remaining.hours * 60;
    remaining.seconds += remaining.minutes * 60;
    let remainingDate = new Date(remaining.seconds * 1000);

    return ((durationDate.getTime() - remainingDate.getTime()) / 1000);
}

export function GetSeconds(time: Time): number {
    time.hours += time.days * 24;
    time.minutes += time.hours * 60;
    time.seconds += time.minutes * 60;
    let date = new Date(time.seconds * 1000);
    
    return (date.getTime() / 1000);
}

export function TimeToString(time: Time): string {
    return `${time.days.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${time.hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${time.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${time.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`
}

export interface Time {
    days: number,
    hours: number,
    minutes: number,
    seconds: number
}