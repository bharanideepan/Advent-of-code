var fs = require("fs");
var input = fs.readFileSync("Day21.txt", "utf8").split("\n").map((row, x) => row.split("").map(e => e.trim()).filter(e => e.length));
const numericKeyboard = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['#', '0', 'A']
]
const directionalKeyboard = [
    ['#', '^', 'A'],
    ['<', 'v', '>']
]
const directions = [
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, 0]
];
const directionsArrow = [
    'v',
    '<',
    '>',
    '^'
]
const memo = {};
const getPaths = (grid, start, end) => {
    const key = `${grid[start[0]][start[1]]}:${grid[end[0]][end[1]]}`;
    if (memo[key]) {
        return memo[key];
    }
    const rows = grid.length;
    const cols = grid[0].length;
    const findPaths = (start, end) => {
        const [x, y] = start;
        const distances = [];
        const pathsList = [];
        const dfs = (x, y, visited, dist, paths) => {
            const [endX, endY] = end;
            if (x === endX && y === endY) {
                distances.push(dist);
                pathsList.push([...paths, 'A']);
                return;
            }
            visited.add(`${x},${y}`);
            for (let index = 0; index < directions.length; index++) {
                const [dx, dy] = directions[index];
                const newRow = x + dx;
                const newCol = y + dy;
                if (
                    newRow >= 0 && newRow < rows &&
                    newCol >= 0 && newCol < cols &&
                    !visited.has(`${newRow},${newCol}`) &&
                    grid[newRow][newCol] !== '#'
                ) {
                    dfs(newRow, newCol, visited, dist + 1, [...paths, directionsArrow[index]]);
                }
            }
            visited.delete(`${x},${y}`);
        };
        const visited = new Set();
        dfs(x, y, visited, 1, []);
        const min = pathsList.reduce((acc, val) => {
            if (acc) {
                acc = Math.min(acc, val.length);
                return acc;
            }
            return val.length;
        }, 0);
        let arrows = pathsList.filter(e => e.length === min).map(e => e.join(""));
        arrows = arrows.reduce((acc, val) => {
            if (val.includes(">^>") || val.includes("<^<") || val.includes(">v>") || val.includes("<v<")
                || val.includes("^>^") || val.includes("^<^") || val.includes("v>v") || val.includes("v<v")) {
                return acc;
            }
            return [...acc, val];
        }, []);
        return { arrows };
    };
    memo[key] = findPaths(start, end)
    return memo[key];
};

function generateCombinations(...arrays) {
    const results = [];
    const helper = (current, index) => {
        if (index === arrays.length) {
            results.push(current);
            return;
        }
        for (const value of arrays[index]) {
            helper([...current, value], index + 1);
        }
    };
    helper([], 0);
    return results.map(e => e.join("").split(""));
}

const a = new Date();
let output = 0;
input.map((row) => {
    let start = [3, 2];
    let end = [0, 0];
    let result1 = [];
    row.map((item) => {
        numericKeyboard.map((row2, x) => {
            row2.map((item2, y) => {
                if (item2 == item) {
                    end = [x, y]
                    const result = getPaths(numericKeyboard, start, end).arrows
                    start = [x, y]
                    result1 = [...result1, result]
                }
            })
        })
    })
    result1 = generateCombinations(...result1)
    for (let i = 0; i < 2; i++) {
        let result2 = [];
        let minLength = 0;
        result1.map((r1) => {
            start = [0, 2]
            let temp = []
            r1.map((item) => {
                directionalKeyboard.map((row2, x) => {
                    row2.map((item2, y) => {
                        if (item2 == item) {
                            end = [x, y]
                            const result = getPaths(directionalKeyboard, start, end).arrows
                            start = [x, y]
                            temp = [...temp, result]
                        }
                    })
                })
            })
            temp = generateCombinations(...temp)
            if (!minLength) {
                result2 = [...temp];
                minLength = temp[0].length;
            } else if (temp[0].length <= minLength) {
                minLength = temp[0].length
                result2 = result2.filter(e => e.length <= minLength);
                result2 = [...result2, ...temp];
            }
        })
        result1 = [...result2]
    }
    console.log(result1.length)
    output += parseInt(row.join("")) * result1[0].length
    console.log(row.join(""), result1[0].length)
})
console.log(output)
console.log((new Date()) - a)

// (638*70) + (965*66) + (780*66) + (803*76) + (246*70)