var fs = require("fs");
let input = fs.readFileSync("Day3.txt", "utf8").split("\n").map(e => e.trim().split(" ").filter(e => e.length).map(e => Number(e.trim())).sort((a, b) => a - b));
console.log(input.reduce((acc, line) => {
    const [a, b, c] = line;
    acc += (a + b) > c ? 1 : 0
    return acc
}, 0))
input = fs.readFileSync("Day3.txt", "utf8").split("\n").map(e => e.trim().split(" ").filter(e => e.length).map(e => Number(e.trim())));
let modifiedInput = [];
for (let i = 0; i < input.length / 3; i++) {
    for (let j = 0; j < 3; j++) {
        modifiedInput.push([input[i * 3][j], input[i * 3 + 1][j], input[i * 3 + 2][j]].sort((a, b) => a - b));
    }
}
console.log(modifiedInput.reduce((acc, line) => {
    const [a, b, c] = line;
    acc += (a + b) > c ? 1 : 0
    return acc
}, 0))
