var fs = require("fs");
var input = fs.readFileSync("Day5.txt", "utf8").split("\n").map(Number)
let count = 0;
for (let i = 0; i < input.length && i >= 0; i++) {
    const item = input[i];
    input[i] += 1
    i = i + item - 1;
    count++
}
console.log(count)
input = fs.readFileSync("Day5.txt", "utf8").split("\n").map(Number)
count = 0;
for (let i = 0; i < input.length && i >= 0; i++) {
    const item = input[i];
    if (item >= 3) {
        input[i] -= 1
    } else {
        input[i] += 1
    }
    i = i + item - 1;
    count++
}
console.log(count)