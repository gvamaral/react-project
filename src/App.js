import { useState } from "react";
import StartMenu from "./StartMenu";
import About from "./About";
import MainMap from "./MainMap";

export default function App() {
    const [mode, setMode] = useState('start')
    return (
        <>
            {mode === 'start' && <StartMenu
            onNewGameClick={() => setMode('newGame')}
            onStartClick={() => setMode('mainMap')}
            onAboutClick={() => setMode('about')}/>}

            {mode === 'mainMap' && <MainMap
            onAboutClick={() => setMode('about')}
            onHomeClick={() => setMode('start')}/>}

            {mode === 'about' && <About
            onHomeClick={() => setMode('start')}
            onStartClick={() => setMode('mainMap')} />}

            {mode === 'newGame' && <MainMap
            onAboutClick={() => setMode('about')}
            onHomeClick={() => setMode('start')}
            newGame={true}/>}
        </>
    )
}