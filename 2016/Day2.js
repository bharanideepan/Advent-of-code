var fs = require("fs");
var input = fs.readFileSync("Day2.txt", "utf8").split("\n").map(e => e.trim().split(""));
const buttons = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
let currentPos = [1, 1];
let result = '';
input.forEach((line) => {
    line.forEach((x) => {
        if (x == 'R') {
            currentPos[1] = currentPos[1] < 2 ? currentPos[1] + 1 : currentPos[1]
        } else if (x == 'L') {
            currentPos[1] = currentPos[1] > 0 ? currentPos[1] - 1 : currentPos[1]
        } else if (x == 'U') {
            currentPos[0] = currentPos[0] > 0 ? currentPos[0] - 1 : currentPos[0]
        } else if (x == 'D') {
            currentPos[0] = currentPos[0] < 2 ? currentPos[0] + 1 : currentPos[0]
        }
    })
    result += `${buttons[currentPos[0]][currentPos[1]]}`
})
console.log(result);
