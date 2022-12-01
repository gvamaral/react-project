import { useState, useEffect } from 'react';
export {
    useMovement as useMovement,
    moveDown as moveDown,
    moveUp as moveUp,
    moveRight as moveRight,
    moveLeft as moveLeft
}
let moveDown;
let moveLeft;
let moveRight;
let moveUp;

function useMovement( gridArray = null ) {
    let speed = 3;

    const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));
    const gridCell = 16;  //Size of a block, just 16 because for some reason it already accounts pixel size
    const MAX_X_POSITION = (gridCell * 15)+6; //Size of a block, times 15 blocks (accounting for start 0), and -5 to account for charater size
    const MAX_Y_POSITION = (gridCell * 15)+3;
    const [facingPosition, setFacingPosition] = useState('');

    let [[x, y], setLocation] = useState([0, gridCell*4]);
    const [walking, setWalking] = useState('false');

    const mapWidth = 16;
    const mapLength = 16;
    const cameraLeft = pixelSize * 65;
    const cameraTop = pixelSize * 42;

    moveUp = () => {
        console.log("Up arrow was pressed, move Up");
        setFacingPosition('face-up');
        setLocation(([prevX, prevY]) => prevY > 0 && movementAllowed('up', prevX, prevY) ? [prevX, prevY - speed] : [prevX, prevY]);
    };
    moveRight = () => {
        console.log("Right arrow was pressed, move Right");
        setFacingPosition('face-right');
        setLocation(([prevX, prevY]) => prevX < MAX_X_POSITION && movementAllowed('right', prevX, prevY) ? [prevX + speed, prevY] : [prevX, prevY]);
    }
    moveDown = () => {
        console.log("Down arrow was pressed, move Down");
        setFacingPosition('face-down');
        setLocation(([prevX, prevY]) => prevY < MAX_Y_POSITION && movementAllowed('down', prevX, prevY) ? [prevX, prevY + speed] : [prevX, prevY]);
    }
    moveLeft = () => {
        console.log("Left arrow was pressed, move Left");
        setFacingPosition('face-left');
        setLocation(([prevX, prevY]) => prevX > 0 && movementAllowed('left', prevX, prevY) ? [prevX - speed, prevY] : [prevX, prevY]);
    }
    function idle() {
        let t;
        window.onload = resetTimer;
        window.ontouchstart = resetTimer; // catches touchscreen swipes as well
        window.ontouchmove = resetTimer;  // required by some devices
        window.onclick = resetTimer;      // catches touchpad clicks as well
        window.addEventListener('mouseup', resetTimer, true);
        window.addEventListener('keyup', resetTimer, true);
        window.addEventListener('mousedown', resetTimer, true);  // catches touchscreen presses as well
        window.addEventListener('keydown', resetTimer, true);

        function yourFunction() {
            facingPosition === 'face-left' ? setFacingPosition('idle-left'):setFacingPosition('idle-right');
            setWalking('true');
        }

        function resetTimer() {
            clearTimeout(t);
            t = setTimeout(yourFunction, 10000);  // time is in milliseconds
        }
    }
    gridArray = creatingArrayforMap(mapLength, mapWidth);
    makingMapWalls();
    console.log(gridArray)

    // Map array 256x256
    function creatingArrayforMap(mapLength, mapWidth) {
        let array = new Array((gridCell*mapLength));
        for(let i = 0; i < array.length; i++) {
            array[i] = new Array((gridCell*mapWidth))
        }
        return array;
    }

    function makingMapWalls() {
        for(let x = 0; x < gridArray.length; x++){
            for(let y = 0; y < gridArray[x].length; y++){
                // Walls for the 2 hills on the top
                if (x <= 3) {
                    gridArray[y][x] = 1;
                }
                else if (x < gridCell*4-6) {
                    if (y < (gridCell*7)-2) {
                        gridArray[y][x] = 1;
                    }
                    else if (y > gridCell*8+3) {
                        gridArray[y][x] = 1;
                    }
                }
                // Walls for middle pool
                if (x > gridCell*6+4 && x <= (gridCell*11)) {
                    if (x <= gridCell*7+4) {
                        if (y >= gridCell*7+6 && y < gridCell*10-6) {
                            gridArray[y][x] = 1;
                        }
                    }
                    else if (y >= gridCell*5+6 && y < gridCell*10-6) {
                        gridArray[y][x] = 1;
                    }
                }
                // Walls for left pool
                if (x > (gridCell*8)+4 && x <= (gridCell*13)) {
                    if (y > gridCell-8 && y < gridCell*3-8) {
                        gridArray[y][x] = 1;
                    }
                }
                // Walls for right Bush
                if (x > gridCell*8+3 && x <= gridCell*14-6) {
                    if (x <= gridCell*9+3) {
                        if (y > gridCell*14+3) {
                            gridArray[y][x] = 1;
                        }
                    }
                    else if (x <= gridCell*10+3) {
                        if (y > gridCell*12) {
                            gridArray[y][x] = 1;
                        }
                    }
                    else if (y > gridCell*11+3) {
                        gridArray[y][x] = 1;
                    }
                }
            }
        }
    }


    const movementAllowed = (direction, coordinateX, coordinateY) => {
        let nextPixelCoordinateX
        let nextPixelCoordinateY

        if (direction === 'right') {
            nextPixelCoordinateX = coordinateX + speed;}
        else if (direction === 'left') {
            nextPixelCoordinateX = coordinateX - speed;}
        else {
            nextPixelCoordinateX = coordinateX}
        if (direction === 'down') {
            nextPixelCoordinateY = coordinateY + speed;}
        else if (direction === 'up') {
            nextPixelCoordinateY = coordinateY - speed;}
        else {
            nextPixelCoordinateY = coordinateY}

        console.log(gridArray[coordinateX][coordinateY]);
        console.log(gridArray[nextPixelCoordinateX][nextPixelCoordinateY]);
        console.log(`(${coordinateX}, ${coordinateY})`);
        console.log(`(${nextPixelCoordinateX}, ${nextPixelCoordinateY})`);

        return nextPixelCoordinateX >= 0 && nextPixelCoordinateY >= 0 && nextPixelCoordinateX <= gridCell*mapLength && nextPixelCoordinateY <= gridCell*mapWidth && !gridArray[nextPixelCoordinateX][nextPixelCoordinateY];
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
    idle();

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleKeyDown);
        document.addEventListener("mouseup", handleKeyUp);
        document.addEventListener("keyup", handleKeyUp);
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
          document.addEventListener("mousedown", handleKeyDown);
          document.addEventListener("mouseup", handleKeyUp);
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