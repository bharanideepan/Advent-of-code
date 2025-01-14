var fs = require("fs");
let coordinates = []
let input = fs.readFileSync("day24.txt", "utf8").split("\n").map((e, x) => {
    return e.trim().split("").map((e1, y) => {
        if (!isNaN(e1)) {
            coordinates[e1] = [x, y]
        }
        return e1;
    })
})
function getPermutations(str) {
    let results = [];
    function permute(arr, prefix = "") {
        if (arr.length === 0 && prefix[0] == '0') {
            results.push(prefix);
        } else {
            for (let i = 0; i < arr.length; i++) {
                let newPrefix = prefix + arr[i];
                let remaining = arr.slice(0, i).concat(arr.slice(i + 1));
                permute(remaining, newPrefix);
            }
        }
    }
    permute(str.split(""));
    return results;
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
const run = (part1 = true) => {
    const string = Object.keys(coordinates).join("")
    const permutations = getPermutations(string)
    let minDistance = -1;
    for (let index = 0; index < permutations.length; index++) {
        const permutation = permutations[index].split("");
        let distance = 0;
        for (let i = 0; i < permutation.length - (part1 ? 1 : 0); i++) {
            const [a, b] = [permutation[i], permutation[i + 1] ?? '0'];
            const [start, end] = [coordinates[a], coordinates[b]];
            distance += dijkstra(input, start, end).distance;
            if (minDistance == -1) {
                continue;
            } else if (distance >= minDistance) {
                break;
            }
        }
        if (minDistance == -1 || distance < minDistance) {
            minDistance = distance;
        }
    }
    console.log(minDistance)
}
run()
run(false)