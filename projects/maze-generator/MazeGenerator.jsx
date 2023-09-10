import { useRef, useState } from "react"
import { Maze } from "./Maze";
import { generateGrid, MazeStatusEnum } from "./MazeUtils";

import "./assets/maze-generator.css"

const getMazeFEState = (state) => {
    return {
        height: state?.height ?? 800,
        width: state?.width ?? 800,
        rowsColsNumber: state?.rowsColsNumber ?? 3,
        speed: state?.speed ?? 1000,
        currentCellColor: state?.currentCellColor ?? "green",
        backgroundColor: state?.backgroundColor ?? "#413d3d",
        start: state?.start ?? {
            rowNum: 0,
            colNum: 0
        },
        cellBorders: state?.cellBorders ?? {
            color: "white",
            width: 2
        }
    }
}

const getMazeBEState = (state) => {
    return {
        grid: generateGrid(state?.rowsColsNumber ?? 3),
        status: MazeStatusEnum.CREATED,
        stack: []
    }
}

export const MazeGenerator = () => {
    const canvasRef = useRef(null);
    const [mazeFEState, setMazeFEState] = useState(getMazeFEState);
    const [mazeBEState, setMazeBEState] = useState(getMazeBEState);

    const isValidStatus = (status) => {
        return mazeBEState.status === status;
    }

    const getStatus = () => {
        return mazeBEState.status;
    }

    const setStatus = (status) => {
        setMazeBEState(prev => {
            return {
                ...prev,
                status: status
            }
        });
    }

    const handleCanvasClick = (event) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;

        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;


        const cellDim = mazeFEState.height / mazeFEState.rowsColsNumber;
        const rowNum = Math.floor(Math.abs(y) / cellDim);
        const colNum = Math.floor(Math.abs(x) / cellDim);

        if (!isValidStatus(MazeStatusEnum.STARTED) && !isValidStatus(MazeStatusEnum.FINISHED)) {
            setMazeFEState(prev => {
                return ({
                    ...prev,
                    start: {
                        rowNum,
                        colNum
                    }
                });
            })
        }
    }

    return (
        <>
            <h2>Maze Generator</h2>
            <button onClick={() => {
                if (!isValidStatus(MazeStatusEnum.CREATED) && !isValidStatus(MazeStatusEnum.STOPPED)) return;

                setStatus(MazeStatusEnum.STARTED);
            }}>Start</button>
            <button onClick={() => {
                setMazeFEState(getMazeFEState)
                setMazeBEState(getMazeBEState)
            }}>Reset</button>
            <button onClick={() => {
                if (!isValidStatus(MazeStatusEnum.STARTED)) return;

                setStatus(MazeStatusEnum.STOPPED);
            }}>Stop</button>
            <button id="next-frame-button" onClick={() => {
                if (isValidStatus(MazeStatusEnum.FINISHED)) return;

                setStatus(MazeStatusEnum.STARTED);
            }}>Next Frame</button>
            <canvas ref={canvasRef} className="maze-canvas" height={mazeFEState.height} width={mazeFEState.width} onClick={handleCanvasClick} />
            <Maze state={{ mazeFEState, mazeBEState, utilFunctions: { isValidStatus, setStatus, getStatus } }} canvasRef={canvasRef} />
        </>
    );
}