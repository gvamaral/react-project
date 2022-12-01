import { useEffect, useRef, useState } from 'react';
import { useMovement, moveDown, moveLeft, moveRight, moveUp } from './useMovement';
import { DPadLeft, DPadRight, DPadUp, DPadDown } from './dPadButtons';
import './App.css';

function MainMap() {
  let intervalRef = useRef(null)
  let {x, gridCell, pixelSize, cameraLeft, y, cameraTop, facingPosition, walking} = useMovement();

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
    </div>
  );
}

export default MainMap;
