import { createContext, useEffect, useRef, useState } from 'react';
import { useMovement, moveDown, moveLeft, moveRight, moveUp } from './useMovement';
import { DPadLeft, DPadRight, DPadUp, DPadDown } from './dPadButtons';
import kickBack from './audio/kick-back.mp3'
import './App.css';
import Settings from './Settings';

function MainMap({ onAboutClick, onHomeClick, newGame }) {
  if (newGame) {
    localStorage.clear()
  }
  else {
    let newGame = false;
  }
  let intervalRef = useRef(null)
  let {x, gridCell, pixelSize, cameraLeft, y, cameraTop, facingPosition, walking} = useMovement();
  let [showModal, setShowModal] = useState(false);

  let [state, setState] = useState({audio: new Audio(kickBack), isPlaying: false});

  let playPause = () => {
    let isPlaying = state.isPlaying;
    if (isPlaying) {
      state.audio.pause();
    }
    else {
      state.audio.play();
    }
    setState({audio: state.audio, isPlaying: !isPlaying});
  }
  let stopAudio = () => state.audio.pause();

  let openModal = () => {
    setShowModal(prev => !prev);
  }

  function startMove(direction) {
    if(intervalRef.current) return;
    intervalRef.current = setInterval(direction, 100);
  }
  const stopMove = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }
  return (
  <div className='body'>
    <div className='camera'>
      <div
      className='map pixel-art'
      style={{'transform': `translate3d(${-x*pixelSize+cameraLeft}px, ${-y*pixelSize+cameraTop}px, 0)`}}
      >
        <div
        className='character'
        walking={walking}
        style={{'transform': `translate3d(${x*pixelSize}px, ${y*pixelSize}px, 0)`}}
        >
          <img
            className={`character-spritesheet ${facingPosition}`}
            src='./images/sprites/pochita.png'
            alt='Character'
            ></img>
        </div>
      </div>
      <div className="dpad">
        <button className="dpad-button dpad-left"
        onMouseDown={() => startMove(moveLeft)}
        onMouseUp={stopMove}>
          <DPadLeft />
        </button>
        <button className="dpad-button dpad-up"
        onMouseDown={() => startMove(moveUp)}
        onMouseUp={stopMove}>
          <DPadUp />
        </button>
        <button className="dpad-button dpad-down"
        onMouseDown={() => startMove(moveDown)}
        onMouseUp={stopMove}>
          <DPadDown />
        </button>
        <button className="dpad-button dpad-right"
        onMouseDown={() => startMove(moveRight)}
        onMouseUp={stopMove}>
          <DPadRight />
        </button>
      </div>
      <div className='settings'
      onClick={openModal} />
      {showModal ? <div className='modal'><Settings
      openModal={openModal}
      onAboutClick={onAboutClick}
      onHomeClick={onHomeClick}
      playPause={playPause}
      isPlaying={state.isPlaying}
      stopAudio={stopAudio}/></div> : null}
    </div>
  </div>
  );
}

export default MainMap;
