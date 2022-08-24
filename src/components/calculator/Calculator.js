import { useCallback, useEffect, useState } from "react";
import { getLocalTime, getSkyTime } from "../../date-tools/regional-time";

function zeroPad(number) {
    return number < 10 ? '0' + number : number;
}

function numberToTime(originalNumber) {
    const hour = Math.floor(originalNumber);
    const fraction = originalNumber - hour;

    const minutes = 60 * fraction;

    return `${zeroPad(hour)}h ${zeroPad(minutes)}m`;
}

function getHourOffsets() {
    const values = [];

    for (let i = 0; i < 13; i++) {
        values.push(i);
        values.push(i + 0.5);
    }

    return values;
}

export default function Calculator() {
    const [timeOffset, setTimeOffset] = useState('0');
    const [beforeOrAfter, setBeforeOrAfter] = useState('before');
    
    const stateUpdaters = {
        timeOffset: setTimeOffset,
        beforeOrAfter: setBeforeOrAfter
    }

    function storeUpdatedValue(event) {
        stateUpdaters[event.target.name](event.target.value);
    }

    function formatTime(offsetInMinutes) {
        return zeroPad(Math.floor(offsetInMinutes / 60)) + ':' + zeroPad(offsetInMinutes % 60);
    }

    function computeNewTime() {
        const offsetDirection = beforeOrAfter === 'before' ? -1 : 1;
        const [selectedHourOffset, selectedMinuteOffset] = numberToTime(timeOffset).split(' ').map((value) => parseInt(value) * offsetDirection);


        const currentDate = new Date();
        const { hour: skyHours, minute: skyMinutes } = getSkyTime(currentDate);
        const { hour: localHours, minute: localMinutes } = getLocalTime(currentDate);

        const hourOffset = localHours - skyHours;
        const minuteOffset = localMinutes - skyMinutes;

        const offsetInMinutes = hourOffset * 60 + minuteOffset;
        const selectedOffsetInMinutes = selectedHourOffset * 60 + selectedMinuteOffset;

        const localOffsetInMinutes = offsetInMinutes + selectedOffsetInMinutes;


        if (localOffsetInMinutes < 0) {
            const correctedOffset = 24 * 60 + localOffsetInMinutes;

            return formatTime(correctedOffset);
        } else {
            return formatTime(localOffsetInMinutes);
        }
    }

    return (
        <div>
            <div>
                <select value={timeOffset} name="timeOffset" onChange={storeUpdatedValue}>
                    {
                        getHourOffsets()
                            .map((value) =>
                                (<option value={value} key={value}>{numberToTime(value)}</option>))
                    }
                </select>
            </div>
            <div>
                <select value={beforeOrAfter} name="beforeOrAfter" onChange={storeUpdatedValue}>
                    <option value="before">before</option>
                    <option value="after">after</option>
                </select>
            </div>
            <div>reset</div>
            <div>Local Time: <span>{computeNewTime()}</span></div>
        </div>
    );
}