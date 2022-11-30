import { useMemo } from 'react';
import "./Shard.css"

const dateFnsTz = require('date-fns-tz');
const dateFns = require('date-fns');

const LocalToSky = (new Date().getTimezoneOffset() * 60) + (dateFnsTz.getTimezoneOffset('America/Los_Angeles') / 1000);

const AbnormalState = {
  TODAY_ENDED: 1,
  NO_SHARD: 2,
}

const initRealm = {
  date: dateFnsTz.utcToZonedTime(new Date(22, 10)), //2022 Nov 1st
  idx: 0, //Prairie
};

function getNowInSky() {
  return dateFns.addSeconds(new Date(), LocalToSky);
}

function getShardData(daysToAdd = 0) {
  const now = getNowInSky();
  const today = dateFns.startOfDay(dateFns.addDays((now), daysToAdd))
  const dayOfMth = today.getDate();
  const dayOfWk = today.getDay(); //Sunday(0) to Saturday(6)
  //Red Shard on Odd days, Black Shard on Even days
  const isRed = dayOfMth % 2 === 1;
  //Red Shard have 3 different timings:468;148;218, Black Shard have 2 different timings:118;138
  const minsIndex = isRed ? ((dayOfMth - 1) / 2) % 3 : ((dayOfMth / 2) % 2) + 3;
  // No Shard on depends on index & weekday
  //   468:Mon;Tue, 148:Tue;Wed, 218:Wed;Thu, 118:Sat;Sun, 138:Sun;Mon
  const haveShard = ![[1, 2], [2, 3], [3, 4], [6, 0], [0, 1]][minsIndex].includes(dayOfWk);
  if (!haveShard) {
    return { state: AbnormalState.NO_SHARD, ...getShardData(daysToAdd + 1) };
  }

  //**Timings**
  const minsFromResets = [468, 148, 218, 118, 138][minsIndex]; //+40 seconds to start
  const hourRepeat = isRed ? 6 : 8;
  const duration = { hours: 3, minutes: 51, seconds: 20 }; //After start
  const earlySkyOffset = { minutes: 40, seconds: 30 }// 40m30s before start 
  const gateShardOffset = { minutes: 8, seconds: 40 }// 8m40s before start

  const nextByParts = Array.from({ length: 3 }, (_, nth) => {
    const start = dateFns.add(today, { hours: nth * hourRepeat, minutes: minsFromResets, seconds: 40 });
    const end = dateFns.add(start, duration);
    const earlySky = dateFns.sub(start, earlySkyOffset);
    const gateShard = dateFns.sub(start, gateShardOffset);
    return { earlySky, gateShard, start, end, };
  }).reduceRight((acc, { start, end, earlySky, gateShard }, idx) => idx >= 3 ? acc : {
    start: (dateFns.isAfter(now, start) ? acc.start : start),
    end: (dateFns.isAfter(now, end) ? acc.end : end),
    earlySky: (dateFns.isAfter(now, earlySky) ? acc.earlySky : earlySky),
    gateShard: (dateFns.isAfter(now, gateShard) ? acc.gateShard : gateShard),
  }, { start: null, end: null, earlySky: null, gateShard: null });

  const sortedDates = Object.entries(nextByParts).filter(([, d]) => d).sort(([, a], [, b]) => dateFns.compareAsc(a, b));

  if (sortedDates.length === 0) {
    return { state: AbnormalState.TODAY_ENDED, ...getShardData(daysToAdd + 1) };
  }

  //**Text**
  // Count number days since init, realm repeat every 5 day
  const realmIdx = (dateFns.differenceInDays(today, initRealm.date) + initRealm.idx) % 5;
  const realm = ['Daylight Prairie', 'Hidden Forest', 'Valley Of Triumph', 'Golden Wasteland', 'Vault Of Knowledge'][realmIdx];
  const map = [
    ["Cave", "Bird Nest", "Sanctuary Island", "Butterfly Field", "Village Islands / Koi Pond"],
    ["Forest End / Garden", "Treehouse", "Elevated Clearing", "Forest Brook", "Boneyard"],
    ["Village of Dreams", "Village of Dreams", "Hermit valley", "Ice Rink", "Ice Rink"],
    ["Graveyard", "Crabfield", "Forgotten Ark", "Broken Temple", "Battlefield"],
    ["Jellyfish Cove", "Jellyfish Cove", "Jellyfish Cove", "Starlight Desert", "Starlight Desert"],
  ][realmIdx][minsIndex];

  return { isRed, realm, map, sortedDates, daysAdded: daysToAdd };
}

export default function Shard() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { state, isRed, realm, map, sortedDates, daysAdded } = useMemo(() => getShardData(), [Math.floor(new Date().getMinutes())]); //Calculate every minute
  const skippedDays = new Array(daysAdded).fill(0).map((_, days) => dateFns.format(dateFns.addDays(getNowInSky(), days + 1), "do")).join(', ');

  const details = [
    `Realm: ${realm}`,
    `Map: ${map}`,
    `Color: ${isRed ? "Red" : "Black"} `,
  ]

  if (state) {
    details.unshift([``, `All shard eruptions has ended`, `(╯°□°)╯︵ ┻━┻ No Shard on ${skippedDays}`][state])
  }

  return (
    <>
      <tr className='heading'><td colSpan='4'>Shard Eruptions</td></tr>
      {details.map((t, i) => <tr key={i} className='shard-detail'><td colSpan={4}>{t}</td></tr>)}
      
    </>
  );
}
