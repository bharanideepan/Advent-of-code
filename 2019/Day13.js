var fs = require("fs");
var input = fs.readFileSync("Day13.txt", "utf8").split(",").map(Number)
let count = 0;
for (let i = 2; i < input.length; i = i + 3) {
    const element = input[i];
    if (element == 2) {
        count++;
    }
}
console.log(count)