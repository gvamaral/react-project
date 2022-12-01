import { useState } from "react";
import StartMenu from "./StartMenu";
import Inventory from "./Inventory";
import MainMap from "./MainMap";

export default function App() {
    const [mode, setMode] = useState('start')
    return (
        <>
            {mode === 'start' && <StartMenu onStartClick={() => setMode('mainMap')}/>}

            {mode === 'mainMap' && <MainMap />}
        </>
    )
}