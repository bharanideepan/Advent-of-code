var fs = require("fs");
var input = fs.readFileSync("Day16.txt", "utf8").split("\n").map(row => row.split("").map(e => e.trim()).filter(e => e.length));

function getKey(c, dir) {
    return `${c.x},${c.y},${dir}`;
}

const dirs = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]
];

const getScore = (grid, start, end) => {
    const queue = [[start.x, start.y, 1, 0, 0]];
    const visited = new Set();
    while (queue.length) {
        queue.sort((a, b) => a[3] - b[3]);
        const [x, y, dir, score, distance] = queue.shift();
        const key = getKey({ x, y }, dir);
        if (x === end.x && y === end.y) return { score, distance };
        if (visited.has(key)) continue;
        visited.add(key);
        const nx = x + dirs[dir][0];
        const ny = y + dirs[dir][1];
        if (grid[ny]?.[nx] !== "#") {
            queue.push([nx, ny, dir, score + 1, distance + 1]);
        }
        queue.push([x, y, (dir + 1) % 4, score + 1000, distance + 1]);
        queue.push([x, y, (dir + 3) % 4, score + 1000, distance + 1]);
    }
};

const getPaths = (
    grid,
    start,
    end,
    lowestScore,
) => {
    const queue = [
        [start.x, start.y, 1, 0, [start]],
    ];
    const visited = new Map();
    const paths = [];
    while (queue.length) {
        const [x, y, dir, score, path] = queue.shift();
        const key = getKey({ x, y }, dir);
        if (score > lowestScore) continue;
        if (visited.has(key) && visited.get(key) < score) continue;
        visited.set(key, score);
        if (x === end.x && y === end.y && score === lowestScore) {
            paths.push(path);
            continue;
        }
        const nx = x + dirs[dir][0];
        const ny = y + dirs[dir][1];
        if (grid[ny]?.[nx] !== "#") {
            queue.push([nx, ny, dir, score + 1, [...path, { x: nx, y: ny }]]);
        }
        queue.push([x, y, (dir + 1) % 4, score + 1000, [...path]]);
        queue.push([x, y, (dir + 3) % 4, score + 1000, [...path]]);
    }
    return paths;
};
let start = { x: 0, y: 0 }
let end = { x: 0, y: 0 }
input.map((row, i) => {
    row.map((item, j) => {
        if (item == 'S') {
            start = { x: i, y: j }
        }
        if (item == 'E') {
            end = { x: i, y: j }
        }
    })
})
let a = new Date();
const result = getScore(input, start, end);
console.log(result, `duration: ${(new Date()) - a}`)
a = new Date();
const paths = getPaths(input, start, end, result.score);
const uniquePaths = new Set();
paths.forEach((path) => {
    path.forEach((p) => uniquePaths.add(getKey(p, 0)));
});
console.log(uniquePaths.size, `duration: ${(new Date()) - a}`)
