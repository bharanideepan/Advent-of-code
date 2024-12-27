var fs = require("fs");
var input = fs.readFileSync("Day19.txt", "utf8").split("\n").map(e => e.trim())
let availableTowels = input.slice(0, 1)[0].split(",").map(e => e.trim());
let max = Math.max(...availableTowels.map(e => e.length))
let towels = input.slice(2);

function validateTowel(towel) {
    const result = [];
    const n = towel.length;
    function generateSplits(start, currentSplit) {
        if (start == n) {
            result.push(currentSplit);
            return;
        }
        for (let end = start + 1; end <= n && end - start <= max; end++) {
            const substring = towel.slice(start, end);
            if (availableTowels.includes(substring)) {
                generateSplits(end, [...currentSplit, substring]);
            }
        }
    }
    generateSplits(0, []);
    const flag = result.some((item) => {
        return item.every((x) => availableTowels.includes(x))
    })
    return flag;
}
const result = towels.reduce((acc, towel) => {
    const valid = validateTowel(towel);
    acc += valid ? 1 : 0
    return acc;
}, 0)
console.log(result)
