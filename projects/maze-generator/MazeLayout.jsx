import { useRef } from "react"
import { Maze } from "./Maze";
import { MazeStatusEnum } from "./MazeUtils";

export const MazeLayout = (props) => {
    const { state, algorithmModule } = props;
    const { mazeFEStateObj, mazeBEStateObj } = state;
    const { mazeFEState, utilFunctionsStateFE } = mazeFEStateObj;
    const { mazeBEState, utilFunctionsStateBE } = mazeBEStateObj;
    const { setStartCell } = utilFunctionsStateFE;
    const { isValidStatus } = utilFunctionsStateBE;

    const canvasRef = useRef(null);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="maze-canvas"
                height={mazeFEState.height}
                width={mazeFEState.width}
                onClick={handleCanvasClick}
            />
            <Maze
                state={{
                    mazeFEStateObj: {
                        mazeFEState,
                        utilFunctionsStateFE
                    },
                    mazeBEStateObj: {
                        mazeBEState,
                        utilFunctionsStateBE
                    }
                }}
                canvasRef={canvasRef}
                algorithmModule={algorithmModule}
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

        const cellDim = mazeFEState.height / mazeFEState.rowsColsNumber;
        const rowNum = Math.floor(Math.abs(y) / cellDim);
        const colNum = Math.floor(Math.abs(x) / cellDim);

        setStartCell(rowNum, colNum)
    }
}