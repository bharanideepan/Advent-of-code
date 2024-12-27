
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
function dijkstra(grid, start, end) {
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]];
    const distance = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    const steps = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    const visited = {
        E: Array.from({ length: rows }, () => Array(cols).fill(false)),
        W: Array.from({ length: rows }, () => Array(cols).fill(false)),
        N: Array.from({ length: rows }, () => Array(cols).fill(false)),
        S: Array.from({ length: rows }, () => Array(cols).fill(false)),
    }
    const priorityQueue = [];
    const pushQueue = (x, y, dist, direction, step, paths) => {
        priorityQueue.push({ x, y, dist, direction, step, paths });
        priorityQueue.sort((a, b) => a.dist - b.dist);
    };
    const [startX, startY] = start;
    distance[startX][startY] = 0;
    steps[startX][startY] = 0;
    pushQueue(startX, startY, 0, 'E', 0, [`${startX},${startY}`]);
    while (priorityQueue.length > 0) {
        const { x, y, dist, direction, step, paths } = priorityQueue.shift();
        if (visited[direction][x][y]) continue;
        visited[direction][x][y] = true;
        const [endX, endY] = end;
        if (x === endX && y === endY) {
            return { score: distance[endX][endY], distance: steps[endX][endY], paths };
        }
        for (let index = 0; index < directions.length; index++) {
            const [dx, dy] = directions[index];
            const newX = x + dx;
            const newY = y + dy;
            const newDirection = getDirection(direction, x, y, newX, newY);
            if (
                newX >= 0 && newX < rows &&
                newY >= 0 && newY < cols &&
                !visited[newDirection][newX][newY] &&
                grid[newX][newY] !== '#'
            ) {
                let flag = direction == newDirection ? 1 : 1001
                const newDist = dist + flag
                console.log(newDist, `${newX},${newY}`)
                if (newDist < distance[newX][newY]) {
                    distance[newX][newY] = newDist;
                    steps[newX][newY] = step + 1;
                    pushQueue(newX, newY, newDist, newDirection, step + 1, [...paths, `${newX},${newY}`]);
                }
            }
        }
    }
    return -1;
}

let start = [0, 0];
let end = [0, 0];
input.map((row, i) => {
    row.map((item, j) => {
        if (item == 'S') {
            start = [i, j]
        }
        if (item == 'E') {
            end = [i, j]
        }
    })
})

const shortestPath = dijkstra(input, start, end);
console.log(shortestPath);
// 4013