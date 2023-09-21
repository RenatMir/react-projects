import { Cell } from "./Cell";

import "#root/projects/minesweeper/assets/css/minesweeper.css"
import { getNeighbours } from "./utils";

export const Board = (props) => {
    const { boardState, stateFunctions } = props;

    const cellDim = Math.floor(boardState.width / boardState.rowsColsNumber) - 2;

    return (
        <div id="board" className="board" style={{ height: boardState.height, width: boardState.width }} >
            {boardState.board.map(row => {
                return row.map((cell, index) => {
                    return <Cell key={index} cell={cell} cellDim={cellDim} stateFunctions={{ ...stateFunctions, openNeingbours }} />
                });
            })}
        </div>
    );

    function openNeingbours(cell) {
        const neighbours = getNeighbours(cell, boardState.board);
        neighbours.forEach(neighbour => {
            if (neighbour.isMine || neighbour.isRevealed || neighbour.isFlagged) return;

            if(!neighbour.isRevealed) neighbour.isRevealed = true;

            if (neighbour.neighborMinesNumber === 0) openNeingbours(neighbour);
        })
    }
}