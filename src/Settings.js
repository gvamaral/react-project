
export default function Settings({ openModal, onAboutClick, onHomeClick, playPause, isPlaying, stopAudio}) {
    return (
        <div className="settings-screen">
            <div className="title"><h1>Settings</h1><button onClick={openModal}>X</button></div>
            <div className="setting-controllers">
                <div className="music-icon"/>
                <label className="switch">
                    {isPlaying ? <input type="checkbox" onChange={playPause} checked></input> : <input type="checkbox" onChange={playPause}></input>}
                    <span className="slider"></span>
                </label>
            </div>
            <div className="about-container">
                <button onClick={() => {
                    stopAudio();
                    onHomeClick();
                    }}
                    className="about-button">Main Menu</button>
                <button onClick={() => {
                    stopAudio();
                    onAboutClick();
                    }}
                    className="about-button">About</button>
            </div>
        </div>
    );
}