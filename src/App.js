import { useEffect, useState } from 'react';
import './Properties.css';
import './App.css';
import Contributors from './components/contributor/Contributors';
import Clock from './components/clock/Clock';
import Events from './components/events/Events';
import WeeklyReset from './components/events/WeeklyReset';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Determine dark theme by OS preference.
  const darkTheme = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  document.getElementsByTagName('body')[0].classList.toggle('dark-theme', !!darkTheme);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className="App">
      <header className="App-header">
        Sky Clock
      </header>
      <div className='main'>
        <main>
          <Clock date={currentDate}></Clock>
          <Events currentDate={currentDate}></Events>
          <WeeklyReset currentDate={currentDate}></WeeklyReset>
          <div id="shard-disclaimer">
            <div>* All shard event times are approximate and may vary up to 10 minutes.</div>
          </div>
          <Contributors></Contributors>
        </main>
      </div>
    </div>
  );
}

export default App;
