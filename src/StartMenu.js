export default function StartMenu({ onStartClick }) {
    return (
        <div className="background">
            <div className="startMenu">
                <button className="startButton" onClick={onStartClick}>Start Game</button>
            </div>
        </div>
    )
}