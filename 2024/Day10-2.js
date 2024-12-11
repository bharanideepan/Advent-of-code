var fs = require("fs");
var input = fs.readFileSync("Day10.txt", "utf8").split("\n").map(row => row.split("").map(e => e.trim()).filter(e => e.length).map(Number))
const countPossibilities = (x, y) => {
    const rows = input.length;
    const cols = input[0].length;
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    const findPathsToNine = (startRow, startCol) => {
        let pathCount = 0;
        const dfs = (currentRow, currentCol, visited) => {
            if (input[currentRow][currentCol] === 9) {
                pathCount++;
                return;
            }
            visited.add(`${currentRow},${currentCol}`);
            for (const [dx, dy] of directions) {
                const newRow = currentRow + dx;
                const newCol = currentCol + dy;

                if (
                    newRow >= 0 && newRow < rows &&
                    newCol >= 0 && newCol < cols &&
                    !visited.has(`${newRow},${newCol}`) &&
                    input[newRow][newCol] === input[currentRow][currentCol] + 1
                ) {
                    dfs(newRow, newCol, visited);
                }
            }
            visited.delete(`${currentRow},${currentCol}`);
        };
        const visited = new Set();
        dfs(startRow, startCol, visited);
        return pathCount;
    };
    return findPathsToNine(x, y);
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