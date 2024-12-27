var fs = require("fs");
var input = fs.readFileSync("Day18.txt", "utf8").split("\n").map(row => row.split(",").map(e => e.trim()).filter(e => e.length).map(Number));
function dijkstra(grid, start, end) {
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]];
    const distance = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false))
    const priorityQueue = [];
    const pushQueue = (x, y, dist) => {
        priorityQueue.push({ x, y, dist });
        priorityQueue.sort((a, b) => a.dist - b.dist);
    };
    const [startX, startY] = start;
    distance[startX][startY] = 0;
    pushQueue(startX, startY, 0,);
    while (priorityQueue.length > 0) {
        const { x, y, dist } = priorityQueue.shift();
        if (visited[x][y]) continue;
        visited[x][y] = true;
        const [endX, endY] = end;
        if (x === endX && y === endY) {
            return { distance: distance[endX][endY] };
        }
        for (let index = 0; index < directions.length; index++) {
            const [dx, dy] = directions[index];
            const newX = x + dx;
            const newY = y + dy;
            if (
                newX >= 0 && newX < rows &&
                newY >= 0 && newY < cols &&
                !visited[newX][newY] &&
                grid[newX][newY] !== '#'
            ) {
                const newDist = dist + 1
                if (newDist < distance[newX][newY]) {
                    distance[newX][newY] = newDist;
                    pushQueue(newX, newY, newDist);
                }
            }
        }
    }
    return -1;
}
const rows = 71;
const cols = 71;
const start = [0, 0];
const end = [70, 70];
const count = 1024;
const grid = Array.from({ length: rows }, () => Array(cols).fill('.'))
for (let index = 0; index < count; index++) {
    const [x, y] = input[index];
    grid[y][x] = '#';
}
const result = dijkstra(grid, start, end)
console.log(result)