const dateFnsTz = require('date-fns-tz');
const dateFns = require('date-fns');

const US_PACIFIC_TIME_ZONE = 'America/Los_Angeles';
const TIME_PATTERN = 'HH:mm:ss';

function getTimeTokens(formattedTime) {
    const [hour, minute, second] = formattedTime.split(':');

    return {
        hour: parseInt(hour),
        minute: parseInt(minute),
        second: parseInt(second)
    };
}

export function getLocalTime(date) {
    const formattedTime = dateFns.format(date, TIME_PATTERN);

    return getTimeTokens(formattedTime);
}

export function getFormattedSkyTime(date, formatString) {
    return dateFnsTz.formatInTimeZone(date, US_PACIFIC_TIME_ZONE, TIME_PATTERN);;
}

export function getSkyTime(date) {
    const formattedTime = dateFnsTz.formatInTimeZone(date, US_PACIFIC_TIME_ZONE, TIME_PATTERN);

    return getTimeTokens(formattedTime);
}