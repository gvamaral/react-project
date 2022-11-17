import { useEffect, useRef } from 'react';
import useKey from './useKey';
import './App.css';

function App() {
  const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));

  function useMovement() {
    let x = 0;
    let y = 0;
    let speed = 1;

    const moveUp = () => {
      console.log("Up arrow was pressed, move Up");
      y -= speed;
      console.log(`y=${y}`);
    }
    const moveRight = () => {
      console.log("Right arrow was pressed, move Right");
      x += speed;
      console.log(`x=${x}`);
    }
    const moveDown = () => {
      console.log("Down arrow was pressed, move Down");
      y += speed;
      console.log(`y=${y}`);
    }
    const moveLeft = () => {
      console.log("Left arrow was pressed, move Left");
      x -= speed;
      console.log(`x=${x}`);
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
        <div className='character'>
          <img className='character-spritesheet face-down' src='./images/sprites/pochita.png' alt='Character'></img>
        </div>
      </div>
    </div>
  );
}

export default App;
