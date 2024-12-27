var fs = require("fs");
let start = [0, 0];
let end = [0, 0];
var input = fs.readFileSync("Day20.txt", "utf8").split("\n").map((row, x) => row.split("").map(e => e.trim()).filter(e => e.length).map((e, y) => {
    if (e == 'S') {
        start = [x, y]
    }
    if (e == 'E') {
        end = [x, y]
    }
    return e
}));
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
input.map(e => console.log(e.join(" ")))
const actualDuration = dijkstra(input, start, end).distance
let grid = input.map(r => r.map(e => e))
let a = new Date()
const trials = [];
for (let i = 1; i < input.length - 1; i++) {
    const row = input[i];
    for (let j = 1; j < row.length - 1; j++) {
        const element = row[j];
        grid = input.map(r => r.map(e => e));
        if (element == '#' || element == 'E') {
            grid[i][j] = 'O'
            const trial = dijkstra(grid, start, end).distance
            if ((actualDuration - trial) >= 100) {
                trials.push(actualDuration - trial)
            }
        }
    }
}
console.log(trials.length);
console.log(new Date() - a);
