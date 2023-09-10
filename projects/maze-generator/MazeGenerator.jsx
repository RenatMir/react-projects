import { Maze } from "./Maze";
import { useRef, useState } from "react"

import "./assets/maze-generator.css"

export const MazeGenerator = () => {
    const canvasRef = useRef(null);
    const [mazeCompleted, setMazeCompleted] = useState(false);

    const mazeData = {
        height: 800,
        width: 800,
        rowsColsNumber: 10,
        speed: 0,
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
    };

    return (
        <>
            <h2>Maze Generator</h2>
            <canvas ref={canvasRef} className="maze-canvas" height={mazeData.height} width={mazeData.width} />
            <Maze mazeData={mazeData} mazeCompletedState={{mazeCompleted, setMazeCompleted}} canvasRef={canvasRef}/>
        </>
    );
}