var fs = require("fs");
var input = fs.readFileSync("Day2.txt", "utf8").split("\n").map(e => e.trim().split(""));
const buttons = [
    ['', '', 1],
    ['', 2, 3, 4,],
    [5, 6, 7, 8, 9],
    ['', 'A', 'B', 'C'],
    ['', '', 'D']
]
console.log(buttons);
const list = ['0,2', '1,1', '1,2', '1,3', '2,0', '2,1', '2,2', '2,3', '2,4', '3,1', '3,2', '3,3', '4,2'];
let currentPos = [2, 0];
let result = '';
input.forEach((line) => {
    line.forEach((x) => {
        if (x == 'R') {
            let temp = `${currentPos[0]},${currentPos[1] + 1}`;
            currentPos[1] = list.includes(temp) ? currentPos[1] + 1 : currentPos[1]
        } else if (x == 'L') {
            let temp = `${currentPos[0]},${currentPos[1] - 1}`;
            currentPos[1] = list.includes(temp) ? currentPos[1] - 1 : currentPos[1]
        } else if (x == 'U') {
            let temp = `${currentPos[0] - 1},${currentPos[1]}`;
            currentPos[0] = list.includes(temp) ? currentPos[0] - 1 : currentPos[0]
        } else if (x == 'D') {
            let temp = `${currentPos[0] + 1},${currentPos[1]}`;
            currentPos[0] = list.includes(temp) ? currentPos[0] + 1 : currentPos[0]
        }
    })
    result += `${buttons[currentPos[0]][currentPos[1]]}`
})
console.log(result);
