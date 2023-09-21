import "#root/projects/minesweeper/assets/css/minesweeper.css"

export const Cell = (props) => {
    const { cell, cellDim, stateFunctions } = props;
    const { setCellRevealed, openNeingbours, updateCellFlagged } = stateFunctions;

    return (
        <div className="cell" style={{ height: cellDim, width: cellDim, backgroundColor: getCellBackgoundColor() }} onClick={handleCellClick} onContextMenu={handleRightClick}>
            <span className="cell-data">
                {(cell.isRevealed && cell.neighborMinesNumber > 0) && cell.neighborMinesNumber}
            </span>
        </div>
    );

    function getCellBackgoundColor() {
        if (cell.isFlagged) return "blue";

        if (cell.isMine) return "red";

        if (cell.isRevealed) return "green";
    }

    function handleRightClick(event) {
        event.preventDefault();

        if (cell.isRevealed) return;

        console.log("HERE");
        updateCellFlagged(cell);
    }

    function handleCellClick() {
        if (cell.isRevealed || cell.isFlagged) return;

        if (cell.isMine) handleCellIsMine(cell);
        if (cell.isEmpty) handleCellIsEmpty(cell);

        setCellRevealed(cell);
    }

    function handleCellIsMine(cell) {
        alert("YOU LOST");
    }

    function handleCellIsEmpty(cell) {
        openNeingbours(cell);
    }
}