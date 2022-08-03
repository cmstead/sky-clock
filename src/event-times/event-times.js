export const eventNames = {
    GEYSER: 'geyser',
    GRANDMA: 'grandma',
    TURTLE: 'turtle',
    SUNSET: 'sunset',
    SHARD: 'shard',
    FAIRY_RING: 'fairyRing',
    FOREST_RAINBOW: 'forestRainbow',
    DAILY_RESET: 'dailyReset'
};

export const eventTypes = {
    WAX: 0,
    ENVIRONMENT: 1,
    RESET: 2
};

export const eventTypeNames = [
    'Wax',
    'Environment',
    'Reset'
];

export const eventTimes = {
    [eventNames.GEYSER]: {
        name: 'Geyser',
        key: eventNames.GEYSER,
        type: eventTypes.WAX,
        period: 120,
        hour: (hour) => hour % 2,
        minute: (minute) => 5 - minute,
        notification: {
            body: 'Geyser erupts in {t} minutes!'
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
    [eventNames.SHARD]: {
        name: 'Shard Event',
        key: eventNames.SHARD,
        type: eventTypes.WAX,
        period: 240,
        hour: (hour) => hour % 2,
        minute: (minute) => 56 - minute
    },
    [eventNames.SUNSET]: {
        name: 'Sunset',
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
};

export const weeklyReset = {
    period: 24 * 60,
    hour: (hour) => 24 - hour,
    minute: (minute) => 0 - minute
};