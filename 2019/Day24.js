var fs = require("fs");
var input = fs.readFileSync("Day24.txt", "utf8").split("\n").map(e => e.trim().split("").map(e1 => e1.trim()))
console.log(input)
const directions = [
    [0, -1], [0, 1], [-1, 0], [1, 0]
]
const arr = [];
let result = "";
while (true) {
    input = input.map((row, i) => {
        return row.map((item, j) => {
            const adjCount = directions.map(([dx, dy]) => input[dx + i]?.[dy + j] ?? '.').filter(e => e == "#").length
            if (item == '#') {
                if (adjCount != 1) {
                    return '.'
                } else {
                    return '#'
                }
            }
            if (adjCount == 1 || adjCount == 2) {
                return '#'
            } else {
                return '.'
            }
        })
    })
    const hash = input.reduce((acc, val) => acc + val.join(""), "")
    if (arr.includes(hash)) {
        result = hash;
        break;
    }
    arr.push(hash)
}
console.log(result.split("").reduce((acc, val, i) => {
    return acc + (val == "#" ? BigInt(2 ** i) : 0n)
}, 0n))