var fs = require("fs");
let containers = fs.readFileSync("Day17.txt", "utf8").split("\n").map(e => Number(e.trim()))
const findCombinations = (containers, target) => {
    const memo = new Map();
    const helper = (index, remaining) => {
        const key = `${index}-${remaining}`;
        if (memo.has(key)) return memo.get(key);
        if (remaining === 0) return [[]];
        if (remaining < 0 || index >= containers.length) return [];
        const include = helper(index + 1, remaining - containers[index]).map(comb => [containers[index], ...comb]);
        const exclude = helper(index + 1, remaining);
        const result = [...include, ...exclude];
        memo.set(key, result);
        return result;
    }
    return helper(0, target);
}
const target = 150;
const combinations = findCombinations(containers, target);

console.log(combinations.length);
const min = combinations.reduce((acc, val) => {
    return (acc > 0 && acc <= val.length) ? acc : val.length;
}, 0)
console.log(combinations.filter(combination => combination.length == min).length);