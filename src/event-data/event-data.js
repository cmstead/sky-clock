import { getFormattedSkyTime } from "../date-tools/regional-time";

const getCurrentCalendarDate = (currentDate) => new Date(getFormattedSkyTime(currentDate, 'yyyy-MM-dd'))
const getCurrentDay = (currentDate) => parseInt(getFormattedSkyTime(currentDate, 'i'));
const getDayOfTheMonth = (currentDate) => parseInt(getFormattedSkyTime(currentDate, 'd'));
const getHours = (hourCount) => hourCount * 60;

const getNextWeeklyEventDay = (dayOfTheWeek) => getCurrentDay(Date.now()) <= (dayOfTheWeek % 7) ? dayOfTheWeek : dayOfTheWeek + 6;

const travelingSpiritComparisonDate = new Date('2024-08-29');

export const eventNames = {
    GEYSER: 'geyser',
    GRANDMA: 'grandma',
    TURTLE: 'turtle',
    DREAMS_SKATER: 'dreamsSkater',
    NEST_SUNSET: 'nestSunset',
    PASSAGE_QUESTS: 'passageQuests',
    DAILY_RESET: 'dailyReset',
    AURORA_CONCERT: 'auroraConcertStarts',
    FIREWORKS_FESTIVAL: 'fireworksFestival',
    WEEKLY_RESET: 'weeklyReset',
    ITEM_ROTATION: 'itemRotation',
    SPELL_SHOP_EXPANDED: 'spellShopExpanded',
    SPELL_SHOP_STANDARD: 'spellShopStandard',
    TRAVELING_SPIRIT_VISIT: 'travelingSpiritVisit',
    TRAVELING_SPIRIT_LEAVE: 'travelingSpiritLeave',
    // FAIRY_RING: 'fairyRing',
    // FOREST_RAINBOW: 'forestRainbow',
    // SANCTUARY_SUNSET: 'sanctuarySunset',
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
    CONCERT: {
        position: 2,
        name: 'Concerts and Shows'
    },
    SHOPS: {
        position: 3,
        name: 'Shops and Spirits'
    },
    RESET: {
        position: 4,
        name: 'Reset'
    },
    ENVIRONMENT: {
        position: 5,
        name: 'Environment'
    },
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
    [eventNames.SANCTUARY_SUNSET]: {
        name: 'Sanctuary Sunset',
        key: eventNames.SANCTUARY_SUNSET,
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
    [eventNames.AURORA_CONCERT]: {
        name: 'Aurora Concert',
        key: eventNames.AURORA_CONCERT,
        type: eventTypes.CONCERT,
        period: getHours(4),
        hour: (hour) => (2 + hour) % 4,
        minute: (minute) => 10 - minute,
    },
    [eventNames.FIREWORKS_FESTIVAL]: {
        name: 'Fireworks Festival',
        key: eventNames.FIREWORKS_FESTIVAL,
        type: eventTypes.CONCERT,
        period: getHours(4),
        isToday: () => getDayOfTheMonth(new Date()) === 1,
        hour: (hour) => (hour + 1) % 2,
        minute: (minute) => 0 - minute
    },
    [eventNames.WEEKLY_RESET]: {
        name: 'Weekly Reset',
        key: eventNames.WEEKLY_RESET,
        type: eventTypes.RESET,
        period: getHours(7 * 24),
        days: (day) => getNextWeeklyEventDay(6) - day,
        hour: (hour) => 24 - hour,
        minute: (minute) => 0 - minute
    },
    [eventNames.ITEM_ROTATION]: {
        name: 'Store Item Rotation',
        key: eventNames.ITEM_ROTATION,
        type: eventTypes.SHOPS,
        period: getHours(7 * 24),
        days: (day) => getNextWeeklyEventDay(1) - day,
        hour: (hour) => 24 - hour,
        minute: (minute) => 0 - minute
    },
    [eventNames.SPELL_SHOP_EXPANDED]: {
        name: 'Spell Shop Expanded Selection',
        key: eventNames.SPELL_SHOP_EXPANDED,
        type: eventTypes.SHOPS,
        showInClock: () => [1, 2, 3, 4].includes(getCurrentDay(Date.now())),
        period: getHours(7 * 24),
        days: (day) => getNextWeeklyEventDay(5) - (day+1),
        hour: (hour) => 24 - hour,
        minute: (minute) => 0 - minute
    },
    [eventNames.SPELL_SHOP_STANDARD]: {
        name: 'Spell Shop Regular Selection',
        key: eventNames.SPELL_SHOP_STANDARD,
        type: eventTypes.SHOPS,
        showInClock: () => [5, 6, 7].includes(getCurrentDay(Date.now())),
        period: getHours(7 * 24),
        days: (day) => getNextWeeklyEventDay(1) - day,
        hour: (hour) => 24 - hour,
        minute: (minute) => 0 - minute
    },
    [eventNames.TRAVELING_SPIRIT_VISIT]: {
        name: 'Next Traveling Spirit',
        key: eventNames.TRAVELING_SPIRIT_VISIT,
        type: eventTypes.SHOPS,
        showInClock: () => (getCurrentCalendarDate(Date.now()) - travelingSpiritComparisonDate) % 14 > 3,
        period: getHours(14 * 24),
        days: (day) => getNextWeeklyEventDay(4) - day,
        hour: (hour) => 24 - hour, 
        minute: (minute) => 0 - minute
    },
    [eventNames.TRAVELING_SPIRIT_LEAVE]: {
        name: 'Traveling Spirit Leaves',
        key: eventNames.TRAVELING_SPIRIT_LEAVE,
        type: eventTypes.SHOPS,
        showInClock: () => (getCurrentCalendarDate(Date.now()) - travelingSpiritComparisonDate) % 14 < 3,
        period: getHours(14 * 24),
        days: (day) => getNextWeeklyEventDay(1) - day,
        hour: (hour) => 24 - hour, 
        minute: (minute) => 0 - minute
    },
};

const eventDefinitions = Object.keys(eventDefinitionsBase).reduce((definitions, eventKey) => ({
    [eventKey]: {
        isToday: () => true,
        showInClock: () => true,
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
