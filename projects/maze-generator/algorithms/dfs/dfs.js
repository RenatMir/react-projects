import { MazeStatusEnum, checkNeighbours, removeWalls } from "#root/projects/maze-generator/utils";

export const init = (currentCellObj, mazeState) => {
    if (currentCellObj.currentCell) {
        currentCellObj.currentCell.isCurrent = false;
        currentCellObj.currentCell.isVisited = false;
        mazeState.stack = [];
    }

    currentCellObj.currentCell = mazeState.grid[mazeState.start.rowNum][mazeState.start.colNum];
    currentCellObj.currentCell.isVisited = true;
    currentCellObj.currentCell.isCurrent = true;
    mazeState.stack.push(currentCellObj.currentCell);
}

export const generateMazeStep = (currentCellObj, mazeState, setStatus) => {
    let nextCell = checkNeighbours(currentCellObj.currentCell, mazeState.grid);
    if (nextCell) {
        nextCell.isVisited = true;
        mazeState.stack.push(currentCellObj.currentCell);
        
        removeWalls(currentCellObj.currentCell, nextCell)
        
        currentCellObj.currentCell.isCurrent = false;
        currentCellObj.currentCell = nextCell;
        currentCellObj.currentCell.isCurrent = true;
    } else if (mazeState.stack.length > 0) {
        currentCellObj.currentCell.isCurrent = false;
        currentCellObj.currentCell = mazeState.stack.pop();
        currentCellObj.currentCell.isCurrent = true;
    } else {
        setStatus(MazeStatusEnum.FINISHED)
        return true;
    }
}
