export const MinesweeperStatusEnum = {
    CREATED: "CREATED",
    STARTED: "STARTED",
    FINISHED: "FINISHED",
}

export function getInitialState(newRowsColsNumber, newMinesNumber) {
    const rowsColsNumber = newRowsColsNumber ?? 8;
    const minesNumber = newMinesNumber ?? 10;

    return {
        height: 800,
        width: 800,
        rowsColsNumber,
        minesNumber,
        board: generateBoard(rowsColsNumber, minesNumber),
        gameStatus: MinesweeperStatusEnum.CREATED
    }
}

function createCell(rowNum, colNum) {
    return {
        rowNum,
        colNum,
        isRevealed: false,
        isMine: false,
        isEmpty: true,
        isFlagged: false,
        neighborMinesNumber: 0
    }
}

export function getNumberOfFlags(boardState) {
    let counter = 0;
    boardState.board.forEach(row => {
        row.forEach(cell => {
            if (cell.isFlagged) counter++;
        });
    });

    return counter;
}

function populateBoardWithBombs(board, minesNumber) {
    let bombsAdded = 0;
    while (bombsAdded < minesNumber) {
        const randRowNum = getRandomColRow(board);
        const randColNum = getRandomColRow(board);

        const cell = board[randRowNum][randColNum];
        if (!cell.isMine) {
            cell.isMine = true;
            cell.isEmpty = false;
            bombsAdded++;
        }
    }

    function getRandomColRow(board) {
        return Math.floor(Math.random() * board.length);
    }
}

export function generateBoard(dimension, minesNumber) {
    let board = [];
    for (let row = 0; row < dimension; row++) {
        let rowArray = [];
        for (let column = 0; column < dimension; column++) {
            let cell = createCell(row, column);
            rowArray.push(cell);
        }
        board.push(rowArray);
    }
    populateBoardWithBombs(board, minesNumber);
    populateBoardWithNumbers(board);
    return board;
}

function populateBoardWithNumbers(board) {
    board.forEach(row => {
        row.forEach(cell => {
            if (!cell.isMine) populateCellWithNumber(cell, board);
        });
    });
}

function populateCellWithNumber(cell, board) {
    const allNeighbours = getNeighbours(cell, board);

    const minesNeighbours = allNeighbours.filter(neighbour => neighbour.isMine);

    if (minesNeighbours.length > 0) {
        cell.isEmpty = false;
        cell.neighborMinesNumber = minesNeighbours.length;
    }
}

export function getNeighbours(cell, board) {
    const { rowNum, colNum } = cell;
    const boardSize = board.length - 1;

    const neighboursObj = {
        top: rowNum > 0 ? board[rowNum - 1][colNum] : null,
        topRight: (rowNum > 0 && colNum < boardSize) ? board[rowNum - 1][colNum + 1] : null,
        right: colNum < boardSize ? board[rowNum][colNum + 1] : null,
        bottomRight: (rowNum < boardSize && colNum < boardSize) ? board[rowNum + 1][colNum + 1] : null,
        bottom: rowNum < boardSize ? board[rowNum + 1][colNum] : null,
        bottomLeft: (rowNum < boardSize && colNum > 0) ? board[rowNum + 1][colNum - 1] : null,
        left: colNum > 0 ? board[rowNum][colNum - 1] : null,
        topLeft: (rowNum > 0 && colNum > 0) ? board[rowNum - 1][colNum - 1] : null
    }

    const neighbours = Object.values(neighboursObj).filter(neighbour => neighbour);

    return neighbours;
}
