import { getFormattedSkyTime } from "../date-tools/regional-time";

const getCurrentDay = (currentDate) => parseInt(getFormattedSkyTime(currentDate, 'i'));
const getDayOfTheMonth = (currentDate) => parseInt(getFormattedSkyTime(currentDate, 'd'));
const getHours = (hourCount) => hourCount * 60;

export const eventNames = {
    GEYSER: 'geyser',
    GRANDMA: 'grandma',
    TURTLE: 'turtle',
    SUNSET: 'sunset',
    DREAMS_SKATER: 'dreamsSkater',
    NEST_SUNSET: 'nestSunset',
    PASSAGE_QUESTS: 'passageQuests',
    FAIRY_RING: 'fairyRing',
    FOREST_RAINBOW: 'forestRainbow',
    DAILY_RESET: 'dailyReset',
    CONCERT_GRABSEATS: 'grabSeats',
    CONCERT_STARTS: 'concertStarts',
    FIREWORKS_FESTIVAL: 'fireworksFestival',
    WEEKLY_RESET: 'weeklyReset',
    ITEM_ROTATION: 'itemRotation'
};

export const eventTypes = {
    WAX: {
        position: 0,
        name: 'Wax'
    },
    QUESTS: {
        position: 1,
        name: 'Quests'
    },
    RESET: {
        position: 2,
        name: 'Reset'
    },
    ENVIRONMENT: {
        position: 3,
        name: 'Environment'
    },
    CONCERT: {
        position: 4,
        name: 'Aurora Concert'
    },
    WEEKLY_EVENTS: {
        position: 5,
        name: 'Weekly Events'
    }
};

const eventDefinitionsBase = {
    [eventNames.GEYSER]: {
        name: 'Geyser',
        key: eventNames.GEYSER,
        type: eventTypes.WAX,
        period: getHours(2),
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
        period: getHours(2),
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
        period: getHours(2),
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
        period: getHours(2),
        isToday: () => [5, 6, 7].includes(getCurrentDay(Date.now())),
        hour: (hour) => (hour + 1) % 2,
        minute: (minute) => 5 - minute,
        notification: {
            body: 'Dreams skater will begin skating in {t} minutes!'
        }
    },
    [eventNames.NEST_SUNSET]: {
        name: 'Nest Sunset',
        key: eventNames.NEST_SUNSET,
        type: eventTypes.QUESTS,
        period: getHours(1),
        hour: (hour) => 0,
        minute: (minute) => 40 - minute
    },
    [eventNames.PASSAGE_QUESTS]: {
        name: 'Passage Quests',
        key: eventNames.PASSAGE_QUESTS,
        type: eventTypes.QUESTS,
        period: 15,
        hour: () => 0,
        minute: (minute) => 15 - (minute % 15)
    },

    [eventNames.FIREWORKS_FESTIVAL]: {
        name: 'Fireworks Festival',
        key: eventNames.FIREWORKS_FESTIVAL,
        type: eventTypes.ENVIRONMENT,
        period: getHours(4),
        isToday: () => getDayOfTheMonth(new Date()) === 1,
        hour: (hour) => (hour + 1) % 2,
        minute: (minute) => 0 - minute
    },
    [eventNames.SUNSET]: {
        name: 'Sanctuary Sunset',
        key: eventNames.SUNSET,
        type: eventTypes.ENVIRONMENT,
        period: getHours(2),
        hour: (hour) => hour % 2,
        minute: (minute) => 50 - minute
    },
    [eventNames.FAIRY_RING]: {
        name: 'Fairy Ring',
        key: eventNames.FAIRY_RING,
        type: eventTypes.ENVIRONMENT,
        period: getHours(1),
        hour: (_) => 0,
        minute: (minute) => 50 - minute
    },
    [eventNames.FOREST_RAINBOW]: {
        name: 'Forest Brook Rainbow',
        key: eventNames.FOREST_RAINBOW,
        type: eventTypes.ENVIRONMENT,
        period: getHours(12),
        hour: (hour) => Math.abs(5 - hour) % 12,
        minute: (minute) => 0 - minute
    },
    [eventNames.DAILY_RESET]: {
        name: 'Daily Reset',
        key: eventNames.DAILY_RESET,
        type: eventTypes.RESET,
        period: getHours(24),
        hour: (hour) => 24 - hour,
        minute: (minute) => 0 - minute
    },
    [eventNames.CONCERT_GRABSEATS]: {
        name: 'Grab Seats',
        key: eventNames.CONCERT_GRABSEATS,
        type: eventTypes.CONCERT,
        period: getHours(4),
        hour: (hour) => (2 + hour) % 4,
        minute: (minute) => 0 - minute,
    },
    [eventNames.CONCERT_STARTS]: {
        name: 'Concert Starts',
        key: eventNames.CONCERT_STARTS,
        type: eventTypes.CONCERT,
        period: getHours(4),
        hour: (hour) => (2 + hour) % 4,
        minute: (minute) => 10 - minute,
    },
    [eventNames.WEEKLY_RESET]: {
        name: 'Weekly Reset',
        key: eventNames.WEEKLY_RESET,
        type: eventTypes.WEEKLY_EVENTS,
        period: getHours(7 * 24),
        days: (day) => 6 - day,
        hour: (hour) => 24 - hour,
        minute: (minute) => 0 - minute
    },
    [eventNames.ITEM_ROTATION]: {
        name: 'Store Item Rotation',
        key: eventNames.ITEM_ROTATION,
        type: eventTypes.WEEKLY_EVENTS,
        period: getHours(7 * 24),
        days: (day) => 7 - day,
        hour: (hour) => 24 - hour,
        minute: (minute) => 0 - minute
    }
};

const eventDefinitions = Object.keys(eventDefinitionsBase).reduce((definitions, eventKey) => ({
    [eventKey]: {
        isToday: () => true,
        days: () => 0,
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
