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
