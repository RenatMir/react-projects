import { useEffect } from "react"
import { MazeStatusEnum, checkNeighbours, drawCells, removeWalls } from "./MazeUtils";

export const Maze = (props) => {
    const { canvasRef, state, } = props;
    const { mazeFEState, mazeBEState, utilFunctions } = state;
    const { isValidStatus, setStatus } = utilFunctions;

    const stack = [];
    let currentCell = mazeBEState.grid[mazeFEState.start.rowNum][mazeFEState.start.colNum];
    stack.push(currentCell);
    currentCell.isVisited = true;
    currentCell.isCurrent = true;

    const generateMaze = () => {
        let nextCell = checkNeighbours(currentCell, mazeBEState.grid);
        if (nextCell) {
            nextCell.isVisited = true;
            stack.push(currentCell);

            removeWalls(currentCell, nextCell)

            currentCell.isCurrent = false;
            currentCell = nextCell;
            currentCell.isCurrent = true;
        } else if (stack.length > 0) {
            currentCell.isCurrent = false;
            currentCell = stack.pop();
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