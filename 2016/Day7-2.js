var fs = require("fs");
let input = fs.readFileSync("Day7.txt", "utf8").split("\n").map(e => e.trim());
function getABAs(input) {
    const arr = [];
    for (let i = 0; i < input.length - 2; i++) {
        const substring = input.slice(i, i + 3);
        if (substring[0] !== substring[1] && substring[0] === substring[2]) {
            arr.push(substring)
        }
    }
    return arr;
}
function extractSubstrings(input) {
    const outsideBrackets = [];
    const insideBrackets = [];
    const outsidePattern = /(?:^|\])([a-z]+)/g;
    const insidePattern = /\[([a-z]+)\]/g;
    let match;
    while ((match = outsidePattern.exec(input)) !== null) {
        outsideBrackets.push(match[1]);
    }
    while ((match = insidePattern.exec(input)) !== null) {
        insideBrackets.push(match[1]);
    }
    return { outsideBrackets, insideBrackets };
}
console.log(input.filter((line) => {
    const match = extractSubstrings(line)
    let arr = [];
    let flagInside = false;
    for (let index = 0; index < match.outsideBrackets.length; index++) {
        const element = match.outsideBrackets[index];
        arr = [...arr, ...getABAs(element)];
    }
    if (!arr.length) return false;
    for (let index = 0; index < match.insideBrackets.length; index++) {
        const element = match.insideBrackets[index];
        flagInside = arr.some((aba) => {
            const [a, b, c] = aba.split("")
            return element.includes(`${b}${a}${b}`)
        });
        if (flagInside) break
    }
    if (flagInside) {
        return true;
    } else {
        return false;
    }
}).length)