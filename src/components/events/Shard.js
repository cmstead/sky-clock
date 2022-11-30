const dateFnsTz = require('date-fns-tz');
const dateFns = require('date-fns');

const LocalToSky = (new Date().getTimezoneOffset() * 60) + (dateFnsTz.getTimezoneOffset('America/Los_Angeles') / 1000);


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
    return null;
  }

  //**Timings**
  const minsFromResets = [468, 148, 218, 118, 138][minsIndex]; //+40 seconds to start
  const hourRepeat = isRed ? 6 : 8;
  const duration = { hours: 3, minutes: 51, seconds: 20 }; //After start
  const earlySkyOffset = { minutes: 39, seconds: 40 }// 39m40s before start 
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
    return null;
  }

  //**Text**
  // Count number days since init, realm repeat every 5 day
  const realmIdx = (dateFns.differenceInDays(today, initRealm.date) + initRealm.idx) % 5;
  const realm = ['Daylight Prairie', 'Hidden Forest', 'Valley Of Triumph', 'Golden Wasteland', 'Vault Of Knowledge'][realmIdx];
}

export default function Shard() {
  return (
    <>
      <tr className='heading'>
        <td colSpan='4'>Shard Eruptions</td>
      </tr>
    </>
  );
}
