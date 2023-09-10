import { Maze } from "./Maze";
import { useRef, useState } from "react"

import "./assets/maze-generator.css"
import { generateGrid, MazeStatusEnum } from "./MazeUtils";
import { useEffect } from "react";

const getMazeFEState = (state) => {
    return {
        height: state?.height ?? 800,
        width: state?.width ?? 800,
        rowsColsNumber: state?.rowsColsNumber ?? 5,
        speed: state?.speed ?? 100,
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
        grid: generateGrid(state?.rowsColsNumber ?? 5),
        status: MazeStatusEnum.CREATED,
        stack: []
    }
}

export const MazeGenerator = () => {
    const canvasRef = useRef(null);
    const [mazeFEState, setMazeFEState] = useState(getMazeFEState);
    const [mazeBEState, setMazeBEState] = useState(getMazeBEState);

    const handleCanvasClick = (event) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;

        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;


        const cellDim = mazeFEState.height / mazeFEState.rowsColsNumber;
        const rowNum = Math.floor(Math.abs(y) / cellDim);
        const colNum = Math.floor(Math.abs(x) / cellDim);

        if (mazeFEState.status !== MazeStatusEnum.STARTED && mazeFEState.status !== MazeStatusEnum.FINISHED) {
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

    return (
        <>
            <h2>Maze Generator</h2>
            <h2>Status: {getStatus()}</h2>
            <button onClick={() => {
                if (mazeBEState.status === MazeStatusEnum.STARTED) return;

                setMazeBEState(prev => {
                    return ({
                        ...prev,
                        status: MazeStatusEnum.STARTED,
                    });
                })
            }}>Start</button>
            <button onClick={() => {
                setMazeFEState(getMazeFEState)
                setMazeBEState(getMazeBEState)
            }}>Reset</button>
            <button onClick={() => {
                if (mazeBEState.status !== MazeStatusEnum.STARTED) return;

                setMazeBEState(prev => {
                    return ({
                        ...prev,
                        status: MazeStatusEnum.STOPPED,
                    });
                })
            }}>Stop</button>
            <canvas ref={canvasRef} className="maze-canvas" height={mazeFEState.height} width={mazeFEState.width} onClick={handleCanvasClick} />
            <Maze state={{ mazeFEState, mazeBEState, utilFunctions: { isValidStatus, setStatus, getStatus } }} canvasRef={canvasRef} />
        </>
    );
}