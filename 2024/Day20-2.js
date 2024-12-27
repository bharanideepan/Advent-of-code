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
function skips(path, maxDist, minDiff) {
    let skips = 0;
    const savedArr = {};
    for (let first = 0; first < path.length - 1; first++) {
        for (let second = first + 1; second < path.length; second++) {
            const saved = second - first;
            const xDiff = Math.abs(path[first][0] - path[second][0]);
            const yDiff = Math.abs(path[first][1] - path[second][1]);
            if (xDiff + yDiff <= maxDist) {
                const s = saved - (xDiff + yDiff);
                if (s >= minDiff) {
                    skips++;
                    savedArr[s] = (savedArr[s] || 0) + 1;
                }
            }
        }
    }
    return skips;
}
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
    const pushQueue = (x, y, dist, paths) => {
        priorityQueue.push({ x, y, dist, paths });
        priorityQueue.sort((a, b) => a.dist - b.dist);
    };
    const [startX, startY] = start;
    distance[startX][startY] = 0;
    pushQueue(startX, startY, 0, [[startX, startY]]);
    while (priorityQueue.length > 0) {
        const { x, y, dist, paths } = priorityQueue.shift();
        if (visited[x][y]) continue;
        visited[x][y] = true;
        const [endX, endY] = end;
        if (x === endX && y === endY) {
            return { distance: distance[endX][endY], paths };
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
                    pushQueue(newX, newY, newDist, [...paths, [newX, newY]]);
                }
            }
        }
    }
    return -1;
}
const result = dijkstra(input, start, end)
const result1 = skips(result.paths, 2, 100)
const result2 = skips(result.paths, 20, 100)
console.log(result1)
console.log(result2)
