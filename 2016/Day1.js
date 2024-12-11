var fs = require("fs");
var input = fs.readFileSync("Day1.txt", "utf8").split(", ");
let pos = [0, 0];
let prev = "N";
const visited = new Set();
for (let index = 0; index < input.length; index++) {
    const element = input[index];
    const [dir, count] = element.split("");
    const [x, y] = pos;
    if (dir == "R") {
        if (prev == 'N') {
            prev = 'E'
            pos[1] += Number(count)
        }
        else if (prev == 'E') {
            prev = 'S'
            pos[0] += Number(count)
        }
        else if (prev == 'S') {
            prev = 'W'
            pos[1] -= Number(count)
        }
        else if (prev == 'W') {
            prev = 'N'
            pos[0] -= Number(count)
        }
    } else if (dir == "L") {
        if (prev == 'N') {
            prev = 'W'
            pos[1] -= Number(count)
        }
        else if (prev == 'E') {
            prev = 'N'
            pos[0] -= Number(count)
        }
        else if (prev == 'S') {
            prev = 'E'
            pos[1] += Number(count)
        }
        else if (prev == 'W') {
            prev = 'S'
            pos[0] += Number(count)
        }
    }
}
console.log(Math.abs(pos[0]) + Math.abs(pos[1]))