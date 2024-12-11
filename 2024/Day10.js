var fs = require("fs");
var input = fs.readFileSync("Day10.txt", "utf8").split("\n").map(row => row.split("").map(e => e.trim()).filter(e => e.length).map(Number))
const topCount = input.filter(row => row.includes(9)).map(e => e.filter(x => x == 9)).flat().length
const countPossibilities = (x, y) => {
    const rows = input.length;
    const cols = input[0].length;
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    const visitedTop = new Set();

    const bfs = (startRow, startCol) => {
        const queue = [[startRow, startCol]];
        const visited = new Set();
        visited.add(`${startRow},${startCol}`);
        while (queue.length > 0) {
            const [currentRow, currentCol] = queue.shift();
            const currentValue = input[currentRow][currentCol];
            if (currentValue === 9 && !visitedTop.has(`${currentRow},${currentCol}`)) {
                visitedTop.add(`${currentRow},${currentCol}`)
                return 1;
            }
            for (const [dx, dy] of directions) {
                const newRow = currentRow + dx;
                const newCol = currentCol + dy;
                if (
                    newRow >= 0 && newRow < rows &&
                    newCol >= 0 && newCol < cols &&
                    !visited.has(`${newRow},${newCol}`) &&
                    input[newRow][newCol] === currentValue + 1
                ) {
                    queue.push([newRow, newCol]);
                    visited.add(`${newRow},${newCol}`);
                }
            }
        }
        return 0;
    };
    let count = 0;
    for (let index = 0; index < topCount; index++) {
        count += bfs(x, y);
    }
    return count;
};
let result = 0;
input.map((row, x) => {
    row.forEach((item, y) => {
        if (item == 0) {
            result += countPossibilities(x, y);
        }
    })
})
console.log(result)