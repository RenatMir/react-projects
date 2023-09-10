import { useEffect } from "react"
import { checkNeighbours, drawCells, generateGrid, removeWalls } from "./MazeUtils";

export const Maze = (props) => {
    const { mazeData, mazeCompletedState, canvasRef } = props;
    const { mazeCompleted, setMazeCompleted } = mazeCompletedState;

    const grid = generateGrid(mazeData.rowsColsNumber, mazeData.end);

    const stack = [];
    let currentCell = grid[mazeData.start.rowNum][mazeData.start.colNum];
    stack.push(currentCell);
    currentCell.isVisited = true;
    currentCell.isCurrent = true;

    const generateMaze = (canvasContext) => {
        drawCells(grid, mazeData, canvasContext);

        let nextCell = checkNeighbours(currentCell, grid, mazeData);
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
            setMazeCompleted(true);
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext('2d');
        let animationFrameId;
        let timeout;

        const generateMazeAnimator = () => {
            if (mazeCompleted) {
                return;
            }

            generateMaze(canvasContext);
            timeout = setTimeout(() => {
                animationFrameId = window.requestAnimationFrame(generateMazeAnimator);
            }, mazeData.speed);
        }
        generateMazeAnimator()

        return () => {
            clearTimeout(timeout);
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [mazeCompleted]);

    return (
        <></>
    );
}