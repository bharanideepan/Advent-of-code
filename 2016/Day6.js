var fs = require("fs");
let input = fs.readFileSync("Day6.txt", "utf8").split("\n").map(e => e.trim());
function containsABBA(input) {
    // Check for any substring matching the ABBA pattern
    for (let i = 0; i < input.length - 3; i++) {
        const substring = input.slice(i, i + 4); // Get a 4-character substring
        if (substring[0] !== substring[1] && substring[0] === substring[3] && substring[1] === substring[2]) {
            return true; // Found an ABBA
        }
    }
    return false; // No ABBA found
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
    let flagOutside = false;
    let flagInside = false;
    for (let index = 0; index < match.outsideBrackets.length; index++) {
        const element = match.outsideBrackets[index];
        flagOutside = containsABBA(element);
        if (flagOutside) {
            break;
        }
    }
    for (let index = 0; index < match.insideBrackets.length; index++) {
        const element = match.insideBrackets[index];
        flagInside = containsABBA(element);
        if (flagInside) {
            break;
        }
    }
    if (flagOutside && !flagInside) {
        return true;
    }
    return false;
}).length)