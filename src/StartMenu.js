export default function StartMenu({ onStartClick, onAboutClick, onNewGameClick }) {
    return (
        <div className="body">
            <div className="background">
                <div className="startMenu">
                    <button className="startMenuButton" onClick={onNewGameClick}>Start New Game</button>
                    <button className="startMenuButton" onClick={onStartClick}>Resume Game</button>
                    <button className="startMenuButton" onClick={onAboutClick}>About</button>
                </div>
            </div>
        </div>
    )
}