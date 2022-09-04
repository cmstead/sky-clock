import { useEffect, useState } from 'react';
import useLocalstorage from './hooks/localstorage';
import './App.css';
import Contributors from './components/contributor/Contributors';
import Clock from './components/clock/Clock';
import Events from './components/events/Events';
import WeeklyReset from './components/events/WeeklyReset';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Particles from "./components/particles-background/particles";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [theme, setTheme] = useLocalstorage('theme', (window.matchMedia?.('(prefers-color-scheme: dark)').matches && 'dark') || 'light');
  document.getElementsByTagName('body')[0].setAttribute('data-theme', theme);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  });

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div className="App">
      <Particles />
      <header className="App-header">
        Sky Clock
        <div className="theme" onClick={toggleTheme}>
          <FontAwesomeIcon className="icon-theme" icon={theme === 'light' ? faMoon : faSun } />
        </div>
      </header>
      <div className='main'>
        <main>
          <Clock date={currentDate}></Clock>
          <Events currentDate={currentDate}></Events>
          <WeeklyReset currentDate={currentDate}></WeeklyReset>
          <div id="shard-disclaimer">
            <div>* All shard event times are approximate and may vary up to 10 minutes.</div>
          </div>
        </main>
      </div>
          <Contributors></Contributors>
    </div>
  );
}

export default App;
