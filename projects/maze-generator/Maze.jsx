import { useEffect } from "react"
import { checkNeighbours, drawCells, generateGrid, removeWalls } from "./MazeUtils";

export const Maze = (props) => {
    const { mazeStateObj, canvasRef } = props;
    const { mazeState, setMazeState } = mazeStateObj;

    const grid = generateGrid(mazeState.rowsColsNumber, mazeState.end);

    const stack = [];
    let currentCell = grid[mazeState.start.rowNum][mazeState.start.colNum];
    stack.push(currentCell);
    currentCell.isVisited = true;
    currentCell.isCurrent = true;

    const generateMaze = () => {
        let nextCell = checkNeighbours(currentCell, grid, mazeState);
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
            setMazeState(prevState => {
                return {
                    ...prevState,
                    isStarted: false,
                    isCompleted: true
                };
            });
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext('2d');
        let animationFrameId;
        let timeout;

        const generateMazeAnimator = () => {
            if (mazeState.isCompleted) return;

            drawCells(grid, mazeState, canvasContext);

            if (!mazeState.isStarted) {
                return;
            } else {
                generateMaze();
            }

            timeout = setTimeout(() => {
                animationFrameId = window.requestAnimationFrame(generateMazeAnimator);
            }, mazeState.speed);
        }
        generateMazeAnimator();

        return () => {
            clearTimeout(timeout);
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [mazeState]);

    return (
        <></>
    );
}