var fs = require("fs");
var input = fs.readFileSync("Day18.txt", "utf8").split("\n").map(row => row.split("").map(e => e.trim()).filter(e => e.length));
input.map((row) => console.log(row.join(" ")))
console.log("\n")
for (let index = 0; index < 100; index++) {
    let newInput = input.map(row => row.map(e => e))
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            const element = input[i][j];
            const neighbors = [input[i + 1]?.[j], input[i - 1]?.[j], input[i][j + 1], input[i][j - 1],
            input[i + 1]?.[j + 1], input[i - 1]?.[j + 1], input[i + 1]?.[j - 1], input[i - 1]?.[j - 1]]
            const onLength = neighbors.filter(e => e && e === "#").length
            if (element === '.') {
                if (onLength === 3) {
                    newInput[i][j] = '#'
                }
            }
            if (element === '#') {
                if (onLength != 2 && onLength != 3) {
                    newInput[i][j] = '.'
                }
            }
        }

    }
    input = newInput.map(row => row.map(e => e))
}
input.map((row) => console.log(row.join(" ")))
console.log("\n")
console.log(input.reduce((acc, val) => {
    acc += val.filter(e => e && e === "#").length
    return acc;
}, 0))