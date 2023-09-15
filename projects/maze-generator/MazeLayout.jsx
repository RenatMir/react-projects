import { useRef } from "react"
import { Maze } from "./Maze";
import { MazeStatusEnum } from "./MazeUtils";

export const MazeLayout = (props) => {
    const { state, algorithmModule } = props;
    const { mazeState, utilStateFunctions } = state;
    const { setStartCell, isValidStatus } = utilStateFunctions;

    const canvasRef = useRef(null);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="maze-canvas"
                height={mazeState.height}
                width={mazeState.width}
                onClick={handleCanvasClick}
            />
            <Maze
                state={{
                    mazeState,
                    utilStateFunctions
                }}
                algorithmModule={algorithmModule}
                canvasRef={canvasRef}
            />
        </>
    );

    function handleCanvasClick(event) {
        if (!isValidStatus(MazeStatusEnum.CREATED)) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;

        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        const cellDim = mazeState.height / mazeState.rowsColsNumber;
        const rowNum = Math.floor(Math.abs(y) / cellDim);
        const colNum = Math.floor(Math.abs(x) / cellDim);

        setStartCell(rowNum, colNum)
    }
}