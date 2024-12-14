var fs = require("fs");
let input = fs.readFileSync("Day14.txt", "utf8").split("\n").map(e => {
    const [a, b] = e.trim().split(" ")
    const [py, px] = a.split("=")[1].split(",").map(Number)
    const [vy, vx] = b.split("=")[1].split(",").map(Number)
    return { px, py, vx, vy }
})
const maxX = 103;
const maxY = 101;
const seconds = 100;
for (let i = 0; i < seconds; i++) {
    input.map((robot) => {
        const tempX = robot.px + robot.vx
        robot.px = ((tempX % maxX) + maxX) % maxX;
        const tempY = robot.py + robot.vy
        robot.py = ((tempY % maxY) + maxY) % maxY;
    })
}
const map = new Map();
input.map(({ px, py }) => {
    const key = `${px},${py}`;
    if (map.has(key)) {
        map.set(key, map.get(key) + 1);
    } else {
        map.set(key, 1);
    }
})
const ignoreX = (maxX - 1) / 2;
const ignoreY = (maxY - 1) / 2;
const q1x = [0, ignoreX - 1]
const q1y = [0, ignoreY - 1]
const q2x = [0, ignoreX - 1]
const q2y = [ignoreY + 1, maxY - 1]
const q3x = [ignoreX + 1, maxX - 1]
const q3y = [0, ignoreY - 1]
const q4x = [ignoreX + 1, maxX - 1]
const q4y = [ignoreY + 1, maxY - 1]
const result = [...map.keys()].reduce((acc, val) => {
    const [x, y] = val.split(",").map(Number);
    if (x >= q1x[0] && x <= q1x[1] && y >= q1y[0] && y <= q1y[1]) {
        return { ...acc, q1: acc.q1 + map.get(val) }
    }
    if (x >= q2x[0] && x <= q2x[1] && y >= q2y[0] && y <= q2y[1]) {
        return { ...acc, q2: acc.q2 + map.get(val) }
    }
    if (x >= q3x[0] && x <= q3x[1] && y >= q3y[0] && y <= q3y[1]) {
        return { ...acc, q3: acc.q3 + map.get(val) }
    }
    if (x >= q4x[0] && x <= q4x[1] && y >= q4y[0] && y <= q4y[1]) {
        return { ...acc, q4: acc.q4 + map.get(val) }
    }
    return acc;
}, { q1: 0, q2: 0, q3: 0, q4: 0 })
console.log(result.q1 * result.q2 * result.q3 * result.q4)
