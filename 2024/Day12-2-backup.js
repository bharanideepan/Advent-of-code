var fs = require("fs");
var input = fs.readFileSync("Day12.txt", "utf8").split("\n").map(row => row.split("").map(e => e.trim()).filter(e => e.length))

const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1]
];
const generateGrid = (coordinates) => {
    let maxX = 0;
    let maxY = 0;
    for (const edge of coordinates) {
        const [x, y] = edge.split(",").map(Number)
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
    }
    const grid = Array.from({ length: maxX + 1 }, () =>
        Array(maxY + 1).fill(0)
    );
    for (const edge of coordinates) {
        const [x, y] = edge.split(",").map(Number)
        grid[x][y] = 1;
    }
    return grid;
}
const transposeGrid = (array) => {
    const rows = array.length;
    const cols = array[0].length;
    const transposedArray = [];
    for (let i = 0; i < cols; i++) {
        const newRow = [];
        for (let j = 0; j < rows; j++) {
            newRow.push(array[j][i]);
        }
        transposedArray.push(newRow);
    }
    return transposedArray;
}
const calculateSides = (coordinates) => {
    let topSides = [];
    let bottomSides = [];
    let leftSides = [];
    let rightSides = [];
    const grid = generateGrid(coordinates)
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        const prevRow = grid[i - 1];
        const nextRow = grid[i + 1];
        let topSidesTemp = [];
        let bottomSidesTemp = []
        for (let j = 0; j < row.length; j++) {
            const itemPrev = prevRow ? prevRow[j] : 0;
            const itemCur = row[j];
            const itemNext = nextRow ? nextRow[j] : 0;
            if (itemCur == 1) {
                if (itemPrev == 1) {
                    topSidesTemp.push([])
                } else {
                    if (topSidesTemp.length) {
                        topSidesTemp[topSidesTemp.length - 1].push(1)
                    } else {
                        topSidesTemp.push([1])
                    }
                }
                if (itemNext == 1) {
                    bottomSidesTemp.push([])
                } else {
                    if (bottomSidesTemp.length) {
                        bottomSidesTemp[bottomSidesTemp.length - 1].push(1)
                    } else {
                        bottomSidesTemp.push([1])
                    }
                }
            } else {
                topSidesTemp.push([])
                bottomSidesTemp.push([])
            }
        }
        topSidesTemp = topSidesTemp.filter(e => e.length)
        bottomSidesTemp = bottomSidesTemp.filter(e => e.length)
        topSidesTemp.length && topSides.push(topSidesTemp)
        bottomSidesTemp && bottomSides.push(bottomSidesTemp)
    }
    const transposedGrid = transposeGrid(grid)
    for (let i = 0; i < transposedGrid.length; i++) {
        const row = transposedGrid[i];
        const prevRow = transposedGrid[i - 1];
        const nextRow = transposedGrid[i + 1];
        let topSidesTemp = [];
        let bottomSidesTemp = []
        for (let j = 0; j < row.length; j++) {
            const itemPrev = prevRow ? prevRow[j] : 0;
            const itemCur = row[j];
            const itemNext = nextRow ? nextRow[j] : 0;
            if (itemCur == 1) {
                if (itemPrev == 1) {
                    topSidesTemp.push([])
                } else {
                    if (topSidesTemp.length) {
                        topSidesTemp[topSidesTemp.length - 1].push(1)
                    } else {
                        topSidesTemp.push([1])
                    }
                }
                if (itemNext == 1) {
                    bottomSidesTemp.push([])
                } else {
                    if (bottomSidesTemp.length) {
                        bottomSidesTemp[bottomSidesTemp.length - 1].push(1)
                    } else {
                        bottomSidesTemp.push([1])
                    }
                }
            } else {
                topSidesTemp.push([])
                bottomSidesTemp.push([])
            }
        }
        topSidesTemp = topSidesTemp.filter(e => e.length)
        bottomSidesTemp = bottomSidesTemp.filter(e => e.length)
        topSidesTemp.length && leftSides.push(topSidesTemp)
        bottomSidesTemp && rightSides.push(bottomSidesTemp)
    }
    let sides = [...topSides, ...bottomSides, ...leftSides, ...rightSides]
    sides = sides.reduce((acc, val) => {
        acc = [...acc, ...val]
        return acc
    }, [])
    return sides.length;
}

const calculateAreaAndPerimeter = () => {
    const rows = input.length;
    const cols = input[0].length;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const bfs = (row, col, type) => {
        const queue = [[row, col]];
        visited[row][col] = true;
        let area = 0;
        let perimeter = 0;
        const coordinates = new Set();
        while (queue.length > 0) {
            const [currentRow, currentColumn] = queue.shift();
            area++;
            coordinates.add(`${currentRow},${currentColumn}`);
            for (let i = 0; i < directions.length; i++) {
                const [dx, dy] = directions[i];
                const newRow = currentRow + dx;
                const newCol = currentColumn + dy;
                if (
                    newRow < 0 || newRow >= rows ||
                    newCol < 0 || newCol >= cols ||
                    input[newRow][newCol] !== type
                ) {
                    perimeter++;
                } else if (!visited[newRow][newCol]) {
                    visited[newRow][newCol] = true;
                    queue.push([newRow, newCol]);
                }
            }
        }
        return { area, perimeter, sides: calculateSides(coordinates) };
    }
    const results = {};
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (!visited[row][col]) {
                const type = input[row][col];
                const { area, perimeter, sides } = bfs(row, col, type);
                if (!results[type]) {
                    results[type] = [];
                }
                results[type].push({ area, perimeter, sides });
            }
        }
    }
    return results;
}
const result = calculateAreaAndPerimeter();
console.log(result);
console.log(Object.values(result).reduce((acc, val) => {
    acc += val.reduce((acc2, val2) => {
        acc2 += val2.area * val2.perimeter;
        return acc2;
    }, 0)
    return acc;
}, 0));
console.log(Object.values(result).reduce((acc, val) => {
    acc += val.reduce((acc2, val2) => {
        acc2 += val2.area * val2.sides;
        return acc2;
    }, 0)
    return acc;
}, 0));
