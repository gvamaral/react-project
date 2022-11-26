import { useState, useEffect } from 'react';

export default function useMovement( gridArray = null ) {
    let speed = 16;

    const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));
    const gridCell = 16;  //Size of a block, just 16 because for some reason it already accounts pixel size
    const MAX_X_POSITION = (gridCell * 15); //Size of a block, times 15 blocks (accounting for start 0), and -5 to account for charater size
    const MAX_Y_POSITION = (gridCell * 15);
    const [facingPosition, setFacingPosition] = useState('');
    // let [x, setX] = useState(0);
    // let [y, setY] = useState(gridCell*4);
    let [[x, y], setLocation] = useState([0, gridCell*4]);
    console.log([x,y])
    const [walking, setWalking] = useState('false');

    const cameraLeft = pixelSize * 65;
    const cameraTop = pixelSize * 42;

    const mapWidth = 16
    let moveUp = () => {
        console.log("Up arrow was pressed, move Up");
        setFacingPosition('face-up');
        setLocation(([prevX, prevY]) => prevY > 0 && movementAllowed(DIRECTION.UP, (prevY/gridCell)*mapWidth+(prevX/gridCell)) ? [prevX, prevY - speed] : [prevX, prevY]);
    };
    const moveRight = () => {
        console.log("Right arrow was pressed, move Right");
        setFacingPosition('face-right');
        setLocation(([prevX, prevY]) => prevX < MAX_X_POSITION && movementAllowed(DIRECTION.RIGHT, (prevY/gridCell)*mapWidth+(prevX/gridCell)) ? [prevX + speed, prevY] : [prevX, prevY]);
    }
    const moveDown = () => {
        console.log("Down arrow was pressed, move Down");
        setFacingPosition('face-down');
        setLocation(([prevX, prevY]) => prevY < MAX_Y_POSITION && movementAllowed(DIRECTION.DOWN, (prevY/gridCell)*mapWidth+(prevX/gridCell)) ? [prevX, prevY + speed] : [prevX, prevY]);
    }
    const moveLeft = () => {
        console.log("Left arrow was pressed, move Left");
        setFacingPosition('face-left');
        setLocation(([prevX, prevY]) => prevX > 0 && movementAllowed(DIRECTION.LEFT, (prevY/gridCell)*mapWidth+(prevX/gridCell)) ? [prevX - speed, prevY] : [prevX, prevY]);
    }

    // gridArray = 16 x 16
    gridArray = gridArray ? gridArray : [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
        0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1,
        0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1,
        0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
        0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]

    const DIRECTION = {
        LEFT: -1,
        RIGHT: +1,
        UP: -16,
        DOWN: +16
    }

    const movementAllowed = (direction, coordinate) => {
        console.log(gridArray[coordinate+direction])
        return coordinate+direction > 0 && coordinate+direction < 16*16 && gridArray[coordinate+direction] === 0
    }

    const handleKeyDown = (e) => {
        if(e.key === 'ArrowUp') { moveUp() }
        else if(e.key === 'ArrowDown') { moveDown() }
        else if(e.key=== 'ArrowLeft') { moveLeft() }
        else if(e.key=== 'ArrowRight') { moveRight() }

        setWalking('true');
    }

    const handleKeyUp = (e) => {
        setWalking('false')
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
          document.removeEventListener("keyup", handleKeyUp);
        }
      }, []);


    return {
        x,
        gridCell,
        pixelSize,
        cameraLeft,
        y,
        cameraTop,
        facingPosition,
        walking
    }
}