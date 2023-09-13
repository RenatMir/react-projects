import { useEffect } from "react"
import { MazeStatusEnum, checkNeighbours, drawCells, removeWalls } from "./MazeUtils";

let currentCell;
let frames;
let renderNextFrame;

export const Maze = (props) => {
    const { canvasRef, state } = props;
    const { mazeFEStateObj, mazeBEStateObj } = state;
    const { mazeFEState } = mazeFEStateObj;
    const { mazeBEState, utilFunctionsStateBE } = mazeBEStateObj;
    const { isValidStatus, setStatus } = utilFunctionsStateBE;

    if (isValidStatus(MazeStatusEnum.CREATED)) {
        frames = 0;
        renderNextFrame = false;

        if(currentCell) {
            currentCell.isCurrent = false;
            currentCell.isVisited = false;
            mazeBEState.stack = [];
        }

        currentCell = mazeBEState.grid[mazeFEState.start.rowNum][mazeFEState.start.colNum];
        currentCell.isVisited = true;
        currentCell.isCurrent = true;
        mazeBEState.stack.push(currentCell);
    }

    const generateMazeStep = () => {
        let nextCell = checkNeighbours(currentCell, mazeBEState.grid);
        if (nextCell) {
            nextCell.isVisited = true;
            mazeBEState.stack.push(currentCell);
            
            removeWalls(currentCell, nextCell)
            
            currentCell.isCurrent = false;
            currentCell = nextCell;
            currentCell.isCurrent = true;
        } else if (mazeBEState.stack.length > 0) {
            currentCell.isCurrent = false;
            currentCell = mazeBEState.stack.pop();
            currentCell.isCurrent = true;
        } else {
            setStatus(MazeStatusEnum.FINISHED)
            return true;
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext('2d');

        const nextFrameButton = document.getElementById('next-frame-button');
        nextFrameButton?.addEventListener('click', () => {
            renderNextFrame = true;
        });

        let animationFrameId;
        let timeout;

        const generateMazeAnimator = () => {
            if (isValidStatus(MazeStatusEnum.FINISHED)) return;
            
            if (!isValidStatus(MazeStatusEnum.STOPPED)) drawCells(mazeBEState.grid, mazeFEState, canvasContext);
            
            if (!isValidStatus(MazeStatusEnum.STARTED)) {
                return;
            } else {
                frames++;
                const isMazeGenerated = generateMazeStep();
                if (renderNextFrame && !isMazeGenerated) {
                    setStatus(MazeStatusEnum.STOPPED);
                    renderNextFrame = false;
                }
            }

            timeout = setTimeout(() => {
                animationFrameId = window.requestAnimationFrame(generateMazeAnimator);
            }, mazeFEState.delay);
        }
        generateMazeAnimator();

        return () => {
            clearTimeout(timeout);
            window.cancelAnimationFrame(animationFrameId);
        }
    }, [mazeBEState, mazeFEState]);

    return (
        <></>
    );
}