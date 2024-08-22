import { useEffect, useState } from 'react';
import './App.css';
import Particles from "./components/particles-background/particles";

import Contributors from './components/contributor/Contributors';
import Clock from './components/clock/Clock';
import Events from './components/events/Events';
import WeeklyReset from './components/events/WeeklyReset';
import SelectTheme from './components/theme/SelectTheme';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  });


  return (
    <div className="App">
      <Particles />
      <header className="App-header">
        Sky Clock
        <SelectTheme></SelectTheme>
      </header>
      <div className='main'>
        <main>
          <Clock date={currentDate}></Clock>
          <Events currentDate={currentDate}></Events>
          <WeeklyReset currentDate={currentDate}></WeeklyReset>
        </main>
      </div>
          <Contributors></Contributors>
    </div>
  );
}

export default App;
