const num = 1350
const maxX = 50
const maxY = 50
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

let grid = Array.from({ length: maxX }, () => Array(maxY).fill("."));
grid = grid.map((row, y) => {
    return row.map((item, x) => {
        let a = (x * x) + (3 * x) + (2 * x * y) + y + (y * y) + num
        let b = a.toString(2).split("").filter(e => e == '1').length
        return b % 2 == 0 ? '.' : '#'
    })
})
const part1 = dijkstra(grid, [1, 1], [39, 31])
console.log(part1.distance)
let part2 = 0;
grid.map((row, x) => {
    row.map((item, y) => {
        if (item !== '#') {
            const a = dijkstra(grid, [1, 1], [x, y])
            if (a.distance <= 50) part2++
        }
    })
})
console.log(part2)