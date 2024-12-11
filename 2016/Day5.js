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
    let max = 0;
    Object.keys(obj[val]).map((char, index) => {
        if (obj[val][char] > max) max = obj[val][char];
        if (max == obj[val][char]) {
            obj[val].max = char
        }
    })
})
console.log(Object.values(obj).reduce((acc, val) => {
    acc += val.max;
    return acc;
}, ''))