import { Maze } from "./Maze";

export const MazeGenerator = () => {
    const mazeData = {
        height: 600,
        width: 600,
        rowsColsNumber: 4
    };

    return (
        <>
            <h2>Maze Generator</h2>
            <Maze mazeData={mazeData} />
        </>
    );
}