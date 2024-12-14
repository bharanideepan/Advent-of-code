var fs = require("fs");
var input = fs.readFileSync("Day12.txt", "utf8").split("\n").map(row => row.split("").map(e => e.trim()).filter(e => e.length))
const calculateAreaAndPerimeter = () => {
    const rows = input.length;
    const cols = input[0].length;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];
    const bfs = (row, col, type) => {
        const queue = [[row, col]];
        visited[row][col] = true;
        let area = 0;
        let perimeter = 0;
        while (queue.length > 0) {
            const [currentRow, currentColumn] = queue.shift();
            area++;
            for (const [dx, dy] of directions) {
                const newRow = currentRow + dx;
                const newCol = currentColumn + dy;
                if (
                    newRow < 0 || newRow >= rows ||
                    newCol < 0 || newCol >= cols ||
                    input[newRow][newCol] !== type
                ) {
                    perimeter++;
                } else if (!visited[newRow][newCol]) {
                    visited[newRow][newCol] = true;
                    queue.push([newRow, newCol]);
                }
            }
        }
        return { area, perimeter };
    }
    const results = {};
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (!visited[row][col]) {
                const type = input[row][col];
                const { area, perimeter } = bfs(row, col, type);
                if (!results[type]) {
                    results[type] = [];
                }
                results[type].push({ area, perimeter });
            }
        }
    }
    return results;
}
const result = calculateAreaAndPerimeter();
console.log(Object.values(result).reduce((acc, val) => {
    acc += val.reduce((acc2, val2) => {
        acc2 += val2.area * val2.perimeter;
        return acc2;
    }, 0)
    return acc;
}, 0));
