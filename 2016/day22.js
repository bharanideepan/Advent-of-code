var fs = require("fs");
let input = fs.readFileSync("day22.txt", "utf8").split("\n").filter((e, i) => i > 1).map((e, i) => {
    const regex = /\/dev\/grid\/node-x(?<x>\d+)-y(?<y>\d+)\s+(?<size>\d+)T\s+(?<used>\d+)T\s+(?<avail>\d+)T\s+(?<use>\d+)%/
    const match = e.match(regex)
    if (match) {
        const { x, y, size, used, avail, use } = match.groups
        return { x: Number(x), y: Number(y), size: Number(size), used: Number(used), avail: Number(avail), use: Number(use) }
    }
})
let pairs = 0
for (let i = 0; i < input.length; i++) {
    const nodeA = input[i]
    if (nodeA.used == 0) continue;
    for (let j = 0; j < input.length; j++) {
        if (i == j) continue;
        const nodeB = input[j]
        if (nodeA.used <= nodeB.avail) {
            pairs++
        }
    }
}
console.log(pairs)