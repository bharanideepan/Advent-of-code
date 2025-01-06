var fs = require("fs");
var input = fs.readFileSync("Day13.txt", "utf8").split("\n").map(e => e.trim())
const coordinates = [];
const instructions = [];
let flag = false;
input.forEach((item) => {
    if (item.length == 0) {
        flag = true;
    } else {
        if (flag) {
            let [a, b] = item.split("=");
            a = a[a.length - 1];
            b = Number(b)
            instructions.push({ direction: a, value: b });
        } else {
            coordinates.push(item.split(",").map(Number));
        }
    }
})
const generateGrid = (coordinates) => {
    let maxX = 0;
    let maxY = 0;
    for (const edge of coordinates) {
        const [y, x] = edge
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
    }
    const grid = Array.from({ length: maxX + 1 }, () =>
        Array(maxY + 1).fill('.')
    );
    for (const edge of coordinates) {
        const [y, x] = edge
        grid[x][y] = '#';
    }
    return grid;
}
let grid = generateGrid(coordinates)
let iteration = instructions.length //set 1 for part 1
for (let i = 0; i < iteration; i++) {
    const { direction, value } = instructions[i];
    let first = [];
    let second = [];
    if (direction == 'y') {
        first = grid.slice(0, value);
        second = grid.slice(value).reverse();
    } else {
        first = grid.map((row) => row.slice(0, value))
        second = grid.map((row) => row.slice(value).reverse())
    }
    grid = first.map((row, x) => row.map((item, y) => (item == '#' || second[x][y] == '#') ? '#' : '.'))
}
console.log(grid.reduce((acc, val) => acc + val.reduce((acc2, val2) => acc2 + (val2 == '#' ? 1 : 0), 0), 0))
grid.map(e => console.log(e.join(" ")))