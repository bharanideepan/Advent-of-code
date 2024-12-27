var fs = require("fs");
var input = fs.readFileSync("Day16.txt", "utf8").split("\n").map(row => row.split("").map(e => e.trim()).filter(e => e.length));

const getDirection = (direction, prevRow, prevCol, curRow, curCol) => {
    if (direction == 'E') {
        if (prevRow == curRow) return 'E';
        if (prevRow < curRow) return 'S';
        if (prevRow > curRow) return 'N';
    }
    if (direction == 'W') {
        if (prevRow == curRow) return 'W';
        if (prevRow < curRow) return 'S';
        if (prevRow > curRow) return 'N';
    }
    if (direction == 'N') {
        if (prevCol == curCol) return 'N';
        if (prevCol < curCol) return 'E';
        if (prevCol > curCol) return 'W';
    }
    if (direction == 'S') {
        if (prevCol == curCol) return 'S';
        if (prevCol < curCol) return 'E';
        if (prevCol > curCol) return 'W';
    }
    return direction;
}

const countPossibilities = (x, y) => {
    const rows = input.length;
    const cols = input[0].length;
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    const findPathsToNine = (startRow, startCol) => {
        const distances = [];
        const pointsResult = [];
        let pathCount = 0;
        const dfs = (currentRow, currentCol, visited, distance, direction, points) => {
            if (input[currentRow][currentCol] === 'E') {
                pathCount++;
                distances.push(distance);
                pointsResult.push(points);
                return;
            }
            visited.add(`${currentRow},${currentCol}`);
            for (const [dx, dy] of directions) {
                const newRow = currentRow + dx;
                const newCol = currentCol + dy;
                let newDirection = getDirection(direction, currentRow, currentCol, newRow, newCol);
                if (
                    newRow >= 0 && newRow < rows &&
                    newCol >= 0 && newCol < cols &&
                    !visited.has(`${newRow},${newCol}`) &&
                    (input[newRow][newCol] === '.' || input[newRow][newCol] === 'E')
                ) {

                    let newPoints = 1;
                    if (direction != newDirection) {
                        newPoints = 1001;
                    }
                    dfs(newRow, newCol, visited, distance + 1, newDirection, points + newPoints);
                }
            }
            visited.delete(`${currentRow},${currentCol}`);
        };
        const visited = new Set();
        dfs(startRow, startCol, visited, 0, 'E', 0);
        return { pathCount, distances, points: pointsResult };
    };
    return findPathsToNine(x, y);
};
let result = 0;
input.map((row, x) => {
    row.forEach((item, y) => {
        if (item == 'S') {
            result = countPossibilities(x, y);
            console.log(result);
        }
    })
})
// console.log(result)