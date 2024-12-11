var fs = require("fs");
let input = fs.readFileSync("Day5.txt", "utf8").split("\n").map(e => e.trim().split("").filter(e => e.length));
let obj = {};
input[0].map((char, index) => {
    obj[index] = {};
})
input.map((line) => {
    line.map((char, index) => {
        obj[index][char] = obj[index][char] ? obj[index][char] + 1 : 1;
    })
})
Object.keys(obj).map((val) => {
    let min = 0;
    Object.keys(obj[val]).map((char, index) => {
        if (min == 0 || obj[val][char] < min) min = obj[val][char];
        if (min == obj[val][char]) {
            obj[val].min = char
        }
    })
})
console.log(Object.values(obj).reduce((acc, val) => {
    acc += val.min;
    return acc;
}, ''))