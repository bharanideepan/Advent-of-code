var fs = require("fs");
let input = fs.readFileSync("day21.txt", "utf8").split("\n").map(e => e.trim())
let string = "dhaegfbc"
// console.log(input)
input.map((line, index) => {
    if (line.includes("swap position")) {
        const regex = /swap position\s+(?<a>\d+)\s+with position\s+(?<b>\d+)/;
        const match = line.match(regex);
        if (match) {
            const [a, b] = [Number(match.groups.a), Number(match.groups.b)];
            let temp = string.split("")
            let [aa, bb] = [temp[a], temp[b]]
            temp[a] = bb
            temp[b] = aa
            string = temp.join("")
        }
    }
    if (line.includes("swap letter")) {
        const regex = /swap letter\s+(?<a>\w+)\s+with letter\s+(?<b>\w+)/;
        const match = line.match(regex);
        if (match) {
            const [a, b] = [match.groups.a, match.groups.b];
            let temp = string.split("").map(e => e === a ? b : e == b ? a : e)
            string = temp.join("")
        }
    }
    if (line.includes("rotate right")) {
        const match = line.match(/rotate right\s+(?<a>\d+)\s+step/) ? line.match(/rotate right\s+(?<a>\d+)\s+step/) : line.match(/rotate right\s+(?<a>\d+)\s+steps/);
        if (match) {
            const a = Number(match.groups.a);
            const n = string.length - (a % string.length);
            let temp = string.split("");
            temp = [temp.slice(n), temp.slice(0, n)].flat();
            string = temp.join("");
        }
    }
    if (line.includes("rotate left")) {
        const match = line.match(/rotate left\s+(?<a>\d+)\s+step/) ? line.match(/rotate left\s+(?<a>\d+)\s+step/) : line.match(/rotate left\s+(?<a>\d+)\s+steps/);
        if (match) {
            const a = Number(match.groups.a);
            const n = (a % string.length);
            let temp = string.split("");
            temp = [temp.slice(n), temp.slice(0, n)].flat();
            string = temp.join("");
        }
    }
    if (line.includes("rotate based")) {
        const match = line.match(/rotate based on position of letter\s+(?<a>\w+)/)
        if (match) {
            let temp = string.split("");
            const index = temp.indexOf(match.groups.a);
            const a = 1 + index + (index >= 4 ? 1 : 0)
            const n = string.length - (a % string.length);
            temp = [temp.slice(n), temp.slice(0, n)].flat();
            string = temp.join("");
        }
    }
    if (line.includes("reverse positions")) {
        const match = line.match(/reverse positions\s+(?<a>\d+)\s+through\s+(?<b>\d+)/)
        if (match) {
            let temp = string.split("");
            const [a, b] = [Number(match.groups.a), Number(match.groups.b)];
            const [x, y, z] = [temp.slice(0, a), temp.slice(a, b + 1), temp.slice(b + 1)];
            temp = [x, y.reverse(), z].flat();
            string = temp.join("");
        }
    }
    if (line.includes("move position")) {
        const match = line.match(/move position\s+(?<a>\d+)\s+to position\s+(?<b>\d+)/)
        if (match) {
            const [a, b] = [Number(match.groups.a), Number(match.groups.b)];
            let temp = string.split("");
            const [x, y, z] = [temp.slice(0, a), temp.slice(a, a + 1), temp.slice(a + 1)]
            temp = [x, z].flat()
            const [x1, y1] = [temp.slice(0, b), temp.slice(b)]
            temp = [x1, y, y1].flat()
            string = temp.join("");
        }
    }
})
console.log(string)