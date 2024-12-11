var fs = require("fs");
var input = fs.readFileSync("Day1.txt", "utf8").split("").map(Number);
let sum = 0;
for (let index = 0; index < input.length; index++) {
    const element = input[index];
    const next = index == input.length - 1 ? input[0] : input[index + 1]
    if (element == next) {
        sum += element
    }
}
console.log(sum)
sum = 0;
for (let index = 0; index < input.length; index++) {
    const element = input[index];
    let nextIndex = index + input.length / 2
    nextIndex = nextIndex > input.length - 1 ? nextIndex - input.length : nextIndex
    if (element == input[nextIndex]) {
        sum += element
    }
}
console.log(sum)