var fs = require("fs");
const dict = {}
var input = fs.readFileSync("Day8.txt", "utf8").split("\n").map((line) => {
    const [a, b] = line.split("if").map(e => e.trim());
    const [left, operator, right] = b.split(" ").map(e => e.trim());
    let [register, value] = a.split("inc").map(e => e.trim());
    if (value) {
        return {
            left, operator, right, register, value, inc: true
        }
    }
    [register, value] = a.split("dec").map(e => e.trim())

    return {
        left, operator, right, register, value, inc: false
    }
})
const registers = {};
let max = undefined;
input.forEach(({ left, right, operator, register, value, inc }) => {
    let flag = false;
    if (!registers[left]) {
        registers[left] = 0;
    }
    if (!registers[register]) {
        registers[register] = 0;
    }
    if (operator == "==") {
        flag = registers[left] == Number(right)
    } else if (operator == "!=") {
        flag = registers[left] != Number(right)
    } else if (operator == ">") {
        flag = registers[left] > Number(right)
    } else if (operator == "<") {
        flag = registers[left] < Number(right)
    } else if (operator == ">=") {
        flag = registers[left] >= Number(right)
    } else if (operator == "<=") {
        flag = registers[left] <= Number(right)
    }
    if (flag) {
        if (inc) {
            registers[register] += Number(value)
        }
        if (!inc) {
            registers[register] -= Number(value)
        }
    }
    if (max == undefined || registers[register] > max) {
        max = registers[register];
    }
})
console.log(Math.max(...Object.values(registers)))
console.log(max)