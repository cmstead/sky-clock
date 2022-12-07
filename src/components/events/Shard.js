import { useMemo } from 'react';
import "./Shard.css"

const dateFnsTz = require('date-fns-tz');
const dateFns = require('date-fns');

//Shards constants
const duration = { hours: 3, minutes: 51, seconds: 20 }; //After start
const earlySkyOffset = { minutes: 40, seconds: 50 }// 40m30s before start 
const gateShardOffset = { minutes: 8, seconds: 40 }// 8m40s before start

const initRealm = {
  date: new Date(22, 10), //2022 Nov 1st
  idx: 0, //Prairie
};

function getNowInSky() {
  //date-fns-tz checks browser timezone, sooo from utc seems to work ¯\_(ツ)_/¯
  return dateFnsTz.utcToZonedTime(new Date(), 'America/Los_Angeles');
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
    return { noShard: true, ...getShardData(daysToAdd + 1) };
  }

  //**Timings**
  const minsFromResets = [468, 148, 218, 118, 138][minsIndex]; //+40 seconds to start
  const hourRepeat = isRed ? 6 : 8;

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
    return { noMore: true, ...getShardData(daysToAdd + 1) };
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

  const rewards = !isRed ? `200 wax` :
    (({
      'Forest End / Garden': '2.5',
      'Treehouse': '3.5',
      'Village of Dreams': '2.5',
      'Jellyfish Cove': '3.5',
    })[map] ?? ['2.0', '2.5', '3.0'][minsIndex]) + ' Ascended Candles';

  return { isRed, realm, map, rewards, sortedDates, daysAdded: daysToAdd };
}

function ShardRows({ partsKey, date }) {
  const skyNow = getNowInSky();
  if (dateFns.isAfter(skyNow, date)) return;
  const duration = dateFns.intervalToDuration({ start: skyNow, end: date });
  const localDate = dateFns.add(new Date(), { ...duration, seconds: duration.seconds + 1 });
  const { days, hours, minutes, seconds } = duration
  const localStr = dateFns.format(localDate, days ? `do, H:mm` : `HH:mm:ss`);
  const relStr = [days && `${days}d`, hours && `${hours}h`, minutes && `${minutes}m`, !days && `${seconds}s`].filter(Boolean).join(' ');
  const name = ({
    start: "Shard Lands",
    end: "Shard Ends",
    earlySky: "Early Shard Sky",
    gateShard: "Gate Shard",
  })[partsKey]
  return (
    <tr className="event">
      <td className="notification" />
      <td>{name}</td>
      <td>{localStr}</td>
      <td>{relStr}</td>
    </tr>
  );
}

export default function Shard() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { noShard, noMore, isRed, realm, map, rewards, sortedDates, daysAdded } = useMemo(() => getShardData(), [Math.floor(new Date().getSeconds() / 10)]); //Calculate every 10 seconds
  const skippedDays = new Array(daysAdded).fill(0).map((_, days) => dateFns.format(dateFns.addDays(getNowInSky(), days), "do"));


  return (
    <>
      <tr className='heading'><td colSpan='4'>Shard Eruptions</td></tr>
      {noMore && <tr className='shard-status'><td colSpan='4'>All shard eruptions on the {skippedDays.shift()} has ended</td></tr>}
      {noShard && <tr className='shard-status'><td colSpan='4'>No Shard on the {skippedDays.join(', ')}. (╯°□°)╯︵ ┻━┻ </td></tr>}
      {daysAdded > 0 && <tr className='heading'><td colSpan='4'> Shard eruptions for {dateFns.format(dateFns.addDays(getNowInSky(), daysAdded), "do 'of' MMM")} </td></tr>}
      <tr className='shard-detail'>
        <td colSpan='2'><strong>Realm: </strong>{realm}</td>
        <td colSpan='2'><strong>Color: </strong>{isRed ? 'Red' : 'Black'}</td>
      </tr>
      <tr className='shard-detail'>
        <td colSpan='2'><strong>Map: </strong>{map}</td>
        <td colSpan='2'><strong>Rewards: </strong>{rewards}</td>
      </tr>
      {sortedDates.map(([partsKey, date]) => <ShardRows key={partsKey} partsKey={partsKey} date={date} daysAdded={daysAdded} />)}
    </>
  );
}
