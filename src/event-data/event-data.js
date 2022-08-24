import { getFormattedSkyTime } from "../date-tools/regional-time";

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

const eventDefinitions = {
    [eventNames.GEYSER]: {
        name: 'Geyser',
        key: eventNames.GEYSER,
        type: eventTypes.WAX,
        period: 120,
        hour: (hour) => hour % 2,
        minute: (minute) => 5 - minute
    },
    [eventNames.GRANDMA]: {
        name: 'Grandma',
        key: eventNames.GRANDMA,
        type: eventTypes.WAX,
        period: 120,
        hour: (hour) => hour % 2,
        minute: (minute) => 35 - minute
    },
    [eventNames.TURTLE]: {
        name: 'Turtle',
        key: eventNames.TURTLE,
        type: eventTypes.WAX,
        period: 120,
        hour: (hour) => hour % 2,
        minute: (minute) => 50 - minute
    },
    [eventNames.SHARD]: {
        key: eventNames.SHARD,
        type: eventTypes.WAX,
        period: 120,
        hour: (hour) => hour % 2,
        minute: (minute) => 50 - minute
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

const getCurrentDay = (eventData) => parseInt(getFormattedSkyTime(eventData.currentDate, 'i'));

Object.defineProperty(eventDefinitions[eventNames.SHARD], 'name', {
    get: () => {
        const eventData = eventDefinitions[eventNames.SHARD];
        const currentDay = getCurrentDay(eventData);
        const isRedShard = [5, 6, 7].includes(currentDay);
        const shardColor = isRedShard ? 'Red' : 'Black';

        return `Shard (${shardColor})*`;
    }
});

export { eventDefinitions };

export const weeklyReset = {
    period: 24 * 60,
    hour: (hour) => 24 - hour,
    minute: (minute) => 0 - minute
};