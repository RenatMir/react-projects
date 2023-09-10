const createCell = (rowNum, colNum) => {
    return {
        rowNum,
        colNum,
        isVisited: false,
        isCurrent: false,
        walls: {
            top: true,
            bottom: true,
            left: true,
            right: true
        }
    }
}

export const MazeStatusEnum = {
    CREATED: "CREATED",
    STARTED: "STARTED",
    STOPPED: "STOPPED",
    FINISHED: "FINISHED",
}

export const generateGrid = (dimension) => {
    const grid = [];
    for (let row = 0; row < dimension; row++) {
        let rowArray = [];
        for (let column = 0; column < dimension; column++) {
            let cell = createCell(row, column);
            rowArray.push(cell);
        }
        grid.push(rowArray);
    }

    return (grid);
}

const drawCell = (cell, mazeState, canvasContext) => {
    const cellDim = mazeState.height / mazeState.rowsColsNumber;
    const x = Math.floor(cell.colNum * mazeState.width / mazeState.rowsColsNumber);
    const y = Math.floor(cell.rowNum * mazeState.height / mazeState.rowsColsNumber);

    const canvasLineWidth = mazeState.cellBorders.width;
    canvasContext.strokeStyle = mazeState.cellBorders.color;
    canvasContext.fillStyle = mazeState.backgroundColor;
    canvasContext.lineWidth = canvasLineWidth;

    canvasContext.fillRect(x, y, cellDim, cellDim);

    if (cell.isCurrent) {
        canvasContext.fillStyle = mazeState.currentCellColor;
        canvasContext.fillRect(x, y, cellDim, cellDim);
    }
    if (cell.walls.top) drawTopWall(x, y, cellDim, canvasContext);
    if (cell.walls.bottom) drawBottomWall(x, y, cellDim, canvasContext);
    if (cell.walls.left) drawLeftWall(x, y, cellDim, canvasContext);
    if (cell.walls.right) drawRightWall(x, y, cellDim, canvasContext);

    function drawTopWall(x, y, cellDim, canvasContext) {
        canvasContext.beginPath();
        canvasContext.moveTo(x, y);
        canvasContext.lineTo(x + cellDim, y);
        canvasContext.stroke();
    }

    function drawBottomWall(x, y, cellDim, canvasContext) {
        canvasContext.beginPath();
        canvasContext.moveTo(x, y + cellDim);
        canvasContext.lineTo(x + cellDim, y + cellDim);
        canvasContext.stroke();
    }

    function drawLeftWall(x, y, cellDim, canvasContext) {
        canvasContext.beginPath();
        canvasContext.moveTo(x, y);
        canvasContext.lineTo(x, y + cellDim);
        canvasContext.stroke();
    }

    function drawRightWall(x, y, cellDim, canvasContext) {
        canvasContext.beginPath();
        canvasContext.moveTo(x + cellDim, y);
        canvasContext.lineTo(x + cellDim, y + cellDim);
        canvasContext.stroke();
    }
}

export const drawCells = (grid, mazeState, canvasContext) => {
    let cell;
    for (let rowIndex = 0; rowIndex < mazeState.rowsColsNumber; rowIndex++) {
        for (let colIndex = 0; colIndex < mazeState.rowsColsNumber; colIndex++) {
            cell = grid[rowIndex][colIndex];
            drawCell(cell, mazeState, canvasContext);
        }
    }
}

export const removeWalls = (currentCell, nextCell) => {
    const x = currentCell.colNum - nextCell.colNum;
    const y = currentCell.rowNum - nextCell.rowNum;

    if (x === 1) {
        currentCell.walls.left = false;
        nextCell.walls.right = false;
    } else if (x === -1) {
        currentCell.walls.right = false;
        nextCell.walls.left = false;
    }

    if (y === 1) {
        currentCell.walls.top = false;
        nextCell.walls.bottom = false;
    } else if (y === -1) {
        currentCell.walls.bottom = false;
        nextCell.walls.top = false;
    }
}

export const checkNeighbours = (cell, grid) => {
    const neighbours = [];

    const currentRow = cell.rowNum;
    const currentColumn = cell.colNum;
    const gridSize = grid.length;

    const topCell = currentRow !== 0 ? grid[currentRow - 1][currentColumn] : undefined;
    const bottomCell = currentRow !== gridSize - 1 ? grid[currentRow + 1][currentColumn] : undefined;
    const leftCell = currentColumn !== 0 ? grid[currentRow][currentColumn - 1] : undefined;
    const rightCell = currentColumn !== gridSize - 1 ? grid[currentRow][currentColumn + 1] : undefined;

    if (topCell && !topCell.isVisited) neighbours.push(topCell);
    if (bottomCell && !bottomCell.isVisited) neighbours.push(bottomCell);
    if (leftCell && !leftCell.isVisited) neighbours.push(leftCell);
    if (rightCell && !rightCell.isVisited) neighbours.push(rightCell);

    if (neighbours.length !== 0) {
        let randomCellIndex = Math.floor(Math.random() * neighbours.length);
        return neighbours[randomCellIndex];
    } else {
        return undefined;
    }
}
