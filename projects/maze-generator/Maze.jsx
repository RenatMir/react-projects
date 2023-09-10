import { useEffect } from "react"
import { MazeStatusEnum, checkNeighbours, drawCells, removeWalls } from "./MazeUtils";

let currentCell;

export const Maze = (props) => {
    const { canvasRef, state } = props;
    const { mazeFEState, mazeBEState, utilFunctions } = state;
    const { isValidStatus, setStatus, getStatus } = utilFunctions;

    if (isValidStatus(MazeStatusEnum.CREATED)) {
        currentCell = mazeBEState.grid[mazeFEState.start.rowNum][mazeFEState.start.colNum];
        currentCell.isVisited = true;
        currentCell.isCurrent = true;
        mazeBEState.stack.push(currentCell);
    }

    const generateMaze = () => {
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
            console.log("Done");
            setStatus(MazeStatusEnum.FINISHED)
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext('2d');
        let animationFrameId;
        let timeout;

        const generateMazeAnimator = () => {
            if (isValidStatus(MazeStatusEnum.FINISHED)) return;

            drawCells(mazeBEState.grid, mazeFEState, canvasContext);

            if (!isValidStatus(MazeStatusEnum.STARTED)) {
                return;
            } else {
                generateMaze();
            }

            timeout = setTimeout(() => {
                animationFrameId = window.requestAnimationFrame(generateMazeAnimator);
            }, mazeFEState.speed);
        }
        generateMazeAnimator();

        if (isValidStatus(MazeStatusEnum.STOPPED)) {
            window.cancelAnimationFrame(animationFrameId);
        }

        return () => {
            clearTimeout(timeout);
            window.cancelAnimationFrame(animationFrameId);
        }
    }, [mazeBEState, mazeFEState]);

    return (
        <></>
    );
}