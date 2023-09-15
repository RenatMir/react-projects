import { MazeStatusEnum, checkNeighbours, removeWalls } from "#root/projects/maze-generator/MazeUtils";

export const init = (currentCellObj, mazeBEState, mazeFEState) => {
    if (currentCellObj.currentCell) {
        currentCellObj.currentCell.isCurrent = false;
        currentCellObj.currentCell.isVisited = false;
        mazeBEState.stack = [];
    }

    currentCellObj.currentCell = mazeBEState.grid[mazeFEState.start.rowNum][mazeFEState.start.colNum];
    currentCellObj.currentCell.isVisited = true;
    currentCellObj.currentCell.isCurrent = true;
    mazeBEState.stack.push(currentCellObj.currentCell);
}

export const generateMazeStep = (currentCellObj, mazeBEState, setStatus) => {
    let nextCell = checkNeighbours(currentCellObj.currentCell, mazeBEState.grid);
    if (nextCell) {
        nextCell.isVisited = true;
        mazeBEState.stack.push(currentCellObj.currentCell);
        
        removeWalls(currentCellObj.currentCell, nextCell)
        
        currentCellObj.currentCell.isCurrent = false;
        currentCellObj.currentCell = nextCell;
        currentCellObj.currentCell.isCurrent = true;
    } else if (mazeBEState.stack.length > 0) {
        currentCellObj.currentCell.isCurrent = false;
        currentCellObj.currentCell = mazeBEState.stack.pop();
        currentCellObj.currentCell.isCurrent = true;
    } else {
        setStatus(MazeStatusEnum.FINISHED)
        return true;
    }
}
