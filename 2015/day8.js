
var fs = require("fs");
let input = fs.readFileSync("Day8.txt", "utf8").split("\n").map(e => e.trim())
const result = input.reduce((acc, val) => {
    acc[0] += val.length
    acc[1] += eval(val.trim()).length
    acc[2] += `"${val.trim().replace(/([\\"])/g, '\\$1')}"`.length
    return acc
}, [0, 0, 0])
console.log(result[0] - result[1], result[2] - result[0]);