import { useEffect, useRef, useState } from 'react';
import useKey from './useKey';
import './App.css';

function App() {
  const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'))*16;
  const [facingPosition, setFacingPosition] = useState('');
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  function useMovement() {
    let speed = 1;

    const moveUp = (event) => {
      console.log("Up arrow was pressed, move Up");
      setFacingPosition('face-up');
      setY(y-speed);
    }
    const moveRight = () => {
      console.log("Right arrow was pressed, move Right");
      setFacingPosition('face-right');
      setX(x+speed);
    }
    const moveDown = () => {
      console.log("Down arrow was pressed, move Down");
      setFacingPosition('face-down');
      setY(y+speed);
    }
    const moveLeft = () => {
      console.log("Left arrow was pressed, move Left");
      setFacingPosition('face-left');
      setX(x-speed);
    }
    useKey("ArrowUp", moveUp);
    useKey("ArrowRight", moveRight);
    useKey("ArrowDown", moveDown);
    useKey("ArrowLeft", moveLeft);
  }
  useMovement();
  return (
    <div className='camera'>
      <div className='map pixel-art'>
        <div
        className='character'
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
