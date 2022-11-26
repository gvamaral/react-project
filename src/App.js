import { useEffect, useRef, useState } from 'react';
import useMovement from './useMovement';
import './App.css';

function App() {
  let {x, gridCell, pixelSize, cameraLeft, y, cameraTop, facingPosition, walking} = useMovement();

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
    </div>
  );
}

export default App;
