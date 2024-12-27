var fs = require("fs");
var input = fs.readFileSync("Day19.txt", "utf8").split("\n").map(e => e.trim())
let availableTowels = input.slice(0, 1)[0].split(",").map(e => e.trim());
let towels = input.slice(2);
const canMakeDesign = (towels, design) => {
    const memo = new Map();
    const recursive = (index) => {
        if (index === design.length) {
            return 1;
        }
        if (memo.has(design.slice(index))) {
            return memo.get(design.slice(index))
        }
        let count = 0;
        for (const towel of towels) {
            const len = towel.length;
            const x = index + len;
            const y = design.slice(index, index + len)
            if (x <= design.length && y === towel) {
                count += recursive(index + len);
            }
        }
        memo.set(design.slice(index), count);
        return count;
    };
    const count = recursive(0);
    return count;
};

const result1 = towels.reduce((acc, towel) => {
    const valid = canMakeDesign(availableTowels, towel);
    acc += valid ? 1 : 0
    return acc;
}, 0)
console.log(result1)
const result2 = towels.reduce((acc, towel) => {
    const valid = canMakeDesign(availableTowels, towel);
    acc += valid ? valid : 0
    return acc;
}, 0)
console.log(result2)
