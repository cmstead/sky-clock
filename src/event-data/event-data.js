import { getFormattedSkyTime } from "../date-tools/regional-time";

const getCurrentDay = (currentDate) => parseInt(getFormattedSkyTime(currentDate, 'i'));

export const eventNames = {
    GEYSER: 'geyser',
    GRANDMA: 'grandma',
    TURTLE: 'turtle',
    SUNSET: 'sunset',
    // SHARD: 'shard',
    DREAMS_SKATER: 'dreamsSkater',
    FAIRY_RING: 'fairyRing',
    FOREST_RAINBOW: 'forestRainbow',
    DAILY_RESET: 'dailyReset',
    CONCERT_GRABSEATS: 'grabSeats',
    CONCERT_STARTS: 'concertStarts'
};

export const eventTypes = {
    WAX: 0,
    ENVIRONMENT: 1,
    RESET: 2,
    CONCERT: 3
};

export const eventTypeNames = [
    'Wax',
    'Environment',
    'Reset',
    'Aurora Concert'
];

const eventDefinitionsBase = {
    [eventNames.GEYSER]: {
        name: 'Geyser',
        key: eventNames.GEYSER,
        type: eventTypes.WAX,
        period: 120,
        hour: (hour) => hour % 2,
        minute: (minute) => 5 - minute,
        notification: {
            body: 'Geyser erupts in {t} minutes!',
            image: '/images/events/geyser.jpg'
        }
    },
    [eventNames.GRANDMA]: {
        name: 'Grandma',
        key: eventNames.GRANDMA,
        type: eventTypes.WAX,
        period: 120,
        hour: (hour) => hour % 2,
        minute: (minute) => 35 - minute,
        notification: {
            body: 'Grandma is visiting in {t} minutes!',
            image: '/images/events/grandma.jpg'
        }
    },
    [eventNames.TURTLE]: {
        name: 'Turtle',
        key: eventNames.TURTLE,
        type: eventTypes.WAX,
        period: 120,
        hour: (hour) => hour % 2,
        minute: (minute) => 50 - minute,
        notification: {
            body: 'Sanctuary turtle is visiting in {t} minutes!'
        }
    },
    [eventNames.DREAMS_SKATER]: {
        name: 'Dreams Skater',
        key: eventNames.DREAMS_SKATER,
        type: eventTypes.WAX,
        period: 120,
        isToday: () => [5, 6, 7].includes(getCurrentDay(Date.now())),
        hour: (hour) => eventDefinitionsBase[eventNames.DREAMS_SKATER].isToday() ? (hour + 1) % 2 : 100,
        minute: (minute) => eventDefinitionsBase[eventNames.DREAMS_SKATER].isToday() ? 5 - minute : 9000,
        notification: {
            body: 'Dreams skater will begin skating in {t} minutes!'
        }
    },
    [eventNames.SUNSET]: {
        name: 'Sanctuary Sunset',
        key: eventNames.SUNSET,
        type: eventTypes.ENVIRONMENT,
        period: 120,
        hour: (hour) => hour % 2,
        minute: (minute) => 50 - minute
    },
    [eventNames.FAIRY_RING]: {
        name: 'Fairy Ring',
        key: eventNames.FAIRY_RING,
        type: eventTypes.ENVIRONMENT,
        period: 60,
        hour: (_) => 0,
        minute: (minute) => 50 - minute
    },
    [eventNames.FOREST_RAINBOW]: {
        name: 'Forest Brook Rainbow',
        key: eventNames.FOREST_RAINBOW,
        type: eventTypes.ENVIRONMENT,
        period: 12 * 60,
        hour: (hour) => Math.abs(5 - hour) % 12,
        minute: (minute) => 0 - minute
    },
    [eventNames.DAILY_RESET]: {
        name: 'Daily Reset',
        key: eventNames.DAILY_RESET,
        type: eventTypes.RESET,
        period: 24 * 60,
        hour: (hour) => 24 - hour,
        minute: (minute) => 0 - minute
    },
    [eventNames.CONCERT_GRABSEATS]: {
        name: 'Grab Seats',
        key: eventNames.CONCERT_GRABSEATS,
        type: eventTypes.CONCERT,
        period: 4 * 60,
        hour: (hour) => (2 + hour) % 4,
        minute: (minute) => 0 - minute,
    },
    [eventNames.CONCERT_STARTS]: {
        name: 'Concert Starts',
        key: eventNames.CONCERT_STARTS,
        type: eventTypes.CONCERT,
        period: 4 * 60,
        hour: (hour) => (2 + hour) % 4,
        minute: (minute) => 10 - minute,
    },
};

const eventDefinitions = Object.keys(eventDefinitionsBase).reduce((definitions, eventKey) => ({
    [eventKey]: {
        isToday: () => true,
        ...eventDefinitionsBase[eventKey]
    },
    ...definitions 
}), {});

export { eventDefinitions };

export const weeklyReset = {
    period: 24 * 60,
    hour: (hour) => 24 - hour,
    minute: (minute) => 0 - minute
};
