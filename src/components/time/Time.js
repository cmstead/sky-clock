import React from "react";

function padTime(time) {
    return time < 10 ? `0${time}` : time;
}

export default function render({ hour, minute, second }) {
    return (<span className="time">{`${padTime(hour)}:${padTime(minute)}${second ? (`:${padTime(second)}`) : ''}`}</span>);
}