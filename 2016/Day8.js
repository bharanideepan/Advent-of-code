var fs = require("fs");
let input = fs.readFileSync("Day8.txt", "utf8").split("\n").map(e => e.trim());
let grid = Array.from({ length: 6 }, () => Array(50).fill(" "));
const transposeGrid = (array) => {
    const rows = array.length;
    const cols = array[0].length;
    const transposedArray = [];
    for (let i = 0; i < cols; i++) {
        const newRow = [];
        for (let j = 0; j < rows; j++) {
            newRow.push(array[j][i]);
        }
        transposedArray.push(newRow);
    }
    return transposedArray;
}
input.forEach((line) => {
    if (line.includes("rect")) {
        const [x, y] = line.split(" ").map(e => e.trim())[1].split("x").map(Number)
        for (let i = 0; i < y; i++) {
            for (let j = 0; j < x; j++) {
                grid[i][j] = "#"
            }
        }
    } else if (line.includes("row")) {
        const [x, y] = line.split("row y=").map(e => e.trim())[1].split("by").map(e => Number(e.trim()))
        const row = grid[x]
        const n = row.length - y
        grid[x] = [row.slice(n), row.slice(0, n)].flat()
    } else if (line.includes("column")) {
        const [x, y] = line.split("column x=").map(e => e.trim())[1].split("by").map(e => Number(e.trim()))
        const transposed = transposeGrid(grid)
        const row = transposed[x]
        const n = row.length - y
        transposed[x] = [row.slice(n), row.slice(0, n)].flat()
        grid = transposeGrid(transposed)
    }
})
grid.map(e => console.log(e.join(" ")))
console.log(grid.reduce((acc, val) => acc + val.reduce((acc2, val2) => acc2 + (val2 == "#" ? 1 : 0), 0), 0))