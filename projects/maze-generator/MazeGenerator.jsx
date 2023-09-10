import { Maze } from "./Maze";
import { useRef, useState } from "react"

import "./assets/maze-generator.css"

const getInitialMazeState = () => {
    return {
        height: 800,
        width: 800,
        rowsColsNumber: 10,
        speed: 0,
        isStarted: false,
        isCompleted: false,
        currentCellColor: "green",
        backgroundColor: "#413d3d",
        start: {
            rowNum: 0,
            colNum: 0
        },
        cellBorders: {
            color: "white",
            width: 2
        }
    }
}

export const MazeGenerator = () => {
    const canvasRef = useRef(null);
    const [mazeState, setMazeState] = useState(getInitialMazeState);

    const handleCanvasClick = (event) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;

        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;


        const cellDim = mazeState.height / mazeState.rowsColsNumber;
        const rowNum = Math.floor(Math.abs(y) / cellDim);
        const colNum = Math.floor(Math.abs(x) / cellDim);

        if (!mazeState.isStarted && !mazeState.isCompleted) {
            setMazeState(prev => {
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
                setMazeState(prev => {
                    return ({
                        ...prev,
                        isStarted: true,
                        isCompleted: false
                    });
                })
            }}>Start</button>
            <button onClick={() => {
                setMazeState(getInitialMazeState)
            }}>Reset</button>
            <canvas ref={canvasRef} className="maze-canvas" height={mazeState.height} width={mazeState.width} onClick={handleCanvasClick} />
            <Maze mazeStateObj={{ mazeState, setMazeState }} canvasRef={canvasRef} />
        </>
    );
}