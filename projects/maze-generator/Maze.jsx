import { Cell } from "./Cell"

import "./assets/maze-generator.css"
const createCell = (rowNum, colNum) => {
    return {
        rowNum,
        colNum,
        current: false,
        visited: false,
        walls: {
            top: true,
            bottom: true,
            left: true,
            right: true
        }
    }
}

const generateCells = (grid, mazeData) => {
    return grid.map(row => {
        return row.map(cell => {
            return <Cell key={[cell.rowNum, cell.colNum]} mazeData={mazeData} cellData={cell} />
        })
    })
}

const generateGrid = (dimension) => {
    const grid = [];
    for (let row = 0; row < dimension; row++) {
        let rowArray = [];
        for (let column = 0; column < dimension; column++) {
            let cell = createCell(row, column);
            rowArray.push(cell);
        }
        grid.push(rowArray);
    }
    grid[0][0].current = true;
    return (grid);
}

export const Maze = (props) => {
    const { mazeData } = props;

    const grid = generateGrid(mazeData.rowsColsNumber);

    const drawGrid = (grid, mazeData) => {
        const cellDimension = mazeData.width / mazeData.rowsColsNumber;

        const linesArr = [];
        let currentCell;

        //TODO: Refactor
        for (let row = 0; row < mazeData.rowsColsNumber; row++) {
            for (let col = 0; col < mazeData.rowsColsNumber; col++) {

                currentCell = grid[row][col];

                //TOP
                if (currentCell.walls.top) {
                    linesArr.push(
                        <line key={['top', row, col]} x1={col * cellDimension} y1={row * cellDimension} x2={(col + 1) * cellDimension} y2={row * cellDimension} stroke="black" strokeWidth="3" />
                    );
                }

                //BOTTOM
                // if (currentCell.walls.bottom) {
                //     linesArr.push(
                //         <line key={['bottom',row, col]} x1={col * cellDimension} y1={(row+1) * cellDimension} x2={(col + 1) * cellDimension} y2={(row+1) * cellDimension} stroke="black" strokeWidth="3" />
                //     );
                // }

                //LEFT
                // if (currentCell.walls.left) {
                //     linesArr.push(
                //         <line key={['left', row, col]} x1={col * cellDimension} y1={row * cellDimension} x2={col * cellDimension} y2={(row+1) * cellDimension} stroke="black" strokeWidth="3" />
                //     );
                // }

                //LEFT
                // if (currentCell.walls.right) {
                //     linesArr.push(
                //         <line key={['right', row, col]} x1={(col+1) * cellDimension} y1={row * cellDimension} x2={(col+1) * cellDimension} y2={(row+1) * cellDimension} stroke="black" strokeWidth="3" />
                //     );
                // }
            }
        }

        return (
            <svg style={{ position: "absolute", height: mazeData.height, width: mazeData.width }}>
                {linesArr}
            </svg>
        );
    }

    return (
        <div className="maze-grid" style={{ height: mazeData.height, width: mazeData.width }}>

            {generateCells(grid, mazeData)}

            {/* {drawGrid(grid, mazeData)} */}
        </div>
    );
}