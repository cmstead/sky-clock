export const eventNames = {
    GEYSER: 'geyser',
    GRANDMA: 'grandma',
    SUNSET: 'sunset',
    SHARD: 'shard',
    FAIRY_RING: 'fairyRing',
    FOREST_RAINBOW: 'forestRainbow'
};


export const eventTimes = {
    [eventNames.GEYSER]: {
        name: 'Geyser',
        period: 120,
        hour: (hour) => hour % 2,
        minute: (minute) => 5 - minute
    },
    [eventNames.GRANDMA]: {
        name: 'Grandma',
        period: 120,
        hour: (hour) => hour % 2,
        minute: (minute) => 35 - minute
    },
    [eventNames.SUNSET]: {
        name: 'Sunset',
        period: 120,
        hour: (hour) => hour % 2,
        minute: (minute) => 50 - minute
    },
    [eventNames.SHARD]: {
        name: 'Shard Event',
        period: 120,
        hour: (hour) => hour % 2,
        minute: (minute) => 50 - minute
    },
    [eventNames.FAIRY_RING]: {
        name: 'Fairy Ring',
        period: 60,
        hour: (_) => 0,
        minute: (minute) => 50 - minute
    },
    [eventNames.FOREST_RAINBOW]: {
        name: 'Forest Brook Rainbow',
        period: 12 * 60,
        hour: (hour) => Math.abs(5 - hour) % 12,
        minute: (minute) => 0 - minute
    }
};

