import { useState } from "react";
import { getInitialState, MinesweeperStatusEnum, getNumberOfFlags } from "#root/projects/minesweeper/utils";
import { Board } from "#root/projects/minesweeper/Board";

import "@/assets/css/pages/minesweeper.css"

function Minesweeper() {
    const [boardState, setBoardState] = useState(getInitialState());

    const numberOfFlags = getNumberOfFlags(boardState);

    if (numberOfFlags === boardState.minesNumber) {
        alert("You won");
    }

    return (
        <div className="page">
            <div className="settings">
            </div>
            <div className="main-section" style={{ width: boardState.width }}>
                <h2 className="headline">Minesweeper</h2>
                <div className="flow-buttons">
                    <button className="project-button" onClick={handleStartClick}>Start</button>
                    <button className="project-button" onClick={handleResetClick}>Reset</button>
                </div>
                <Board
                    boardState={boardState}
                    stateFunctions={{
                        setCellRevealed,
                        updateCellFlagged
                    }}
                />
            </div>

            <div className="additional-information"></div>
        </div>
    );

    function isValidStatus(status) {
        return boardState.gameStatus === status;
    }

    function setStatus(status) {
        setBoardState(prev => {
            return {
                ...prev,
                gameStatus: status
            }
        });
    }

    function setCellRevealed(cell) {
        setBoardState(prev => {
            prev.board[cell.rowNum][cell.colNum].isRevealed = true;
            return {
                ...prev,
                board: prev.board
            }
        });
    }

    function updateCellFlagged(cell) {
        setBoardState(prev => {
            prev.board[cell.rowNum][cell.colNum].isFlagged = !cell.isFlagged;
            return {
                ...prev,
                board: prev.board
            }
        });
    }

    function handleStartClick() {
        if (isValidStatus(MinesweeperStatusEnum.STARTED)) return;

        setStatus(MinesweeperStatusEnum.STARTED);
    }

    function handleResetClick() {
        setBoardState(getInitialState())
    }
}

export default Minesweeper