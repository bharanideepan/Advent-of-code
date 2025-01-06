var fs = require("fs");
let input = fs.readFileSync("Day15.txt", "utf8").split("\n").map(e => e.trim().split("").map(Number))

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
                !visited[newX][newY]
            ) {
                const newDist = dist + grid[newX][newY]
                if (newDist < distance[newX][newY]) {
                    distance[newX][newY] = newDist;
                    pushQueue(newX, newY, newDist);
                }
            }
        }
    }
    return -1;
}

input = input.map((row) => {
    let newRow = [row];
    for (let i = 0; i < 4; i++) {
        newRow.push(newRow[newRow.length - 1].map(e => (e + 1 == 10) ? 1 : e + 1))
    }
    return newRow.flat();
})
let newInputArr = [input]
for (let i = 0; i < 4; i++) {
    newInputArr.push(newInputArr[newInputArr.length - 1].map(row => row.map(e => (e + 1 == 10) ? 1 : e + 1)))
}
input = newInputArr.flat();
const result = dijkstra(newInputArr.flat(), [0, 0], [input.length - 1, input[0].length - 1])
console.log(result);