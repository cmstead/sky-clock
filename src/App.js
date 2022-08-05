import { useEffect, useState } from "react";
import "./App.css";
import Clock from "./components/clock/Clock";
import Events from "./components/events/Events";
import WeeklyReset from "./components/events/WeeklyReset";
import Particles from "./components/particles-background/particles";

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
            <header className="App-header">Sky Clock</header>
            <div className="main">
                <main>
                    <Clock date={currentDate}></Clock>
                    <Events currentDate={currentDate}></Events>
                    <WeeklyReset currentDate={currentDate}></WeeklyReset>
                </main>
            </div>
        </div>
    );
}

export default App;
