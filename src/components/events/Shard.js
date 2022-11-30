const dateFnsTz = require('date-fns-tz');
const dateFns = require('date-fns');

const LocalToSky = (new Date().getTimezoneOffset() * 60) + (dateFnsTz.getTimezoneOffset('America/Los_Angeles') / 1000);

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

  const minsFromResets = [468, 148, 218, 118, 138][minsIndex]; //+40 seconds to start
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
