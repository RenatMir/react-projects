import { useEffect } from "react"
import { MazeStatusEnum, checkNeighbours, drawCells, removeWalls } from "./MazeUtils";

//Is used for delay the next frame logic. If set to 0, the next frame logic could be rendered twice
const delayForNextFrame = 2000;

const currentCellObj = {
    currentCell: null
};

export const Maze = (props) => {
    const { canvasRef, state, algorithmModule } = props;
    const { mazeFEStateObj, mazeBEStateObj } = state;
    const { mazeFEState } = mazeFEStateObj;
    const { mazeBEState, utilFunctionsStateBE } = mazeBEStateObj;
    const { isValidStatus, setStatus, getStatus } = utilFunctionsStateBE;

    if (isValidStatus(MazeStatusEnum.CREATED)) {
        algorithmModule?.init(currentCellObj, mazeBEState, mazeFEState);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext('2d');

        let animationFrameId;
        let timeout;

        const generateMazeAnimator = () => {
            if (isValidStatus(MazeStatusEnum.FINISHED)) return;

            if (!isValidStatus(MazeStatusEnum.STARTED) && !isValidStatus(MazeStatusEnum.NEXT_FRAME)) {
                drawCells(mazeBEState.grid, mazeFEState, canvasContext);
                return;
            } else {
                algorithmModule?.generateMazeStep(currentCellObj, mazeBEState, setStatus);
                drawCells(mazeBEState.grid, mazeFEState, canvasContext);

                if (isValidStatus(MazeStatusEnum.NEXT_FRAME)) {
                    setStatus(MazeStatusEnum.STOPPED);
                }
            }

            timeout = setTimeout(() => {
                animationFrameId = window.requestAnimationFrame(generateMazeAnimator);
            }, isValidStatus(MazeStatusEnum.NEXT_FRAME) ? delayForNextFrame : mazeFEState.delay);
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