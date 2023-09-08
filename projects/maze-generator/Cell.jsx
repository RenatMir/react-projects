import "./assets/maze-generator.css"

export const Cell = (props) => {
    const { mazeData, cellData } = props;
    const cellDimension = mazeData.width / mazeData.rowsColsNumber - 2;
    return (
        <div className="maze-cell" style={{ height: cellDimension, width: cellDimension, backgroundColor: cellData.current ? "purple" :"green" }} />
    );
}