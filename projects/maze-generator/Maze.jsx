import { useEffect } from "react"
import { MazeStatusEnum, checkNeighbours, drawCells, removeWalls } from "./utils";

//Is used for delay the next frame logic. If set to 0, the next frame logic could be rendered twice
const delayForNextFrame = 2000;

const currentCellObj = {
    currentCell: null
};

export const Maze = (props) => {
    const { canvasRef, state, algorithmModule } = props;
    const { mazeState, utilStateFunctions } = state;
    const { isValidStatus, setStatus } = utilStateFunctions;

    if (isValidStatus(MazeStatusEnum.CREATED)) {
        algorithmModule?.init(currentCellObj, mazeState);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext('2d');

        let animationFrameId;
        let timeout;

        const generateMazeAnimator = () => {
            if (isValidStatus(MazeStatusEnum.FINISHED)) return;

            if (!isValidStatus(MazeStatusEnum.STARTED) && !isValidStatus(MazeStatusEnum.NEXT_FRAME)) {
                drawCells(mazeState.grid, mazeState, canvasContext);
                return;
            } else {
                algorithmModule?.generateMazeStep(currentCellObj, mazeState, setStatus);
                drawCells(mazeState.grid, mazeState, canvasContext);

                if (isValidStatus(MazeStatusEnum.NEXT_FRAME)) {
                    setStatus(MazeStatusEnum.STOPPED);
                }
            }

            timeout = setTimeout(() => {
                animationFrameId = window.requestAnimationFrame(generateMazeAnimator);
            }, isValidStatus(MazeStatusEnum.NEXT_FRAME) ? delayForNextFrame : mazeState.delay);
        }
        generateMazeAnimator();

        return () => {
            clearTimeout(timeout);
            window.cancelAnimationFrame(animationFrameId);
        }
    }, [mazeState]);

    return (
        <></>
    );
}