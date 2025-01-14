var fs = require("fs");
let input = fs.readFileSync("day20.txt", "utf8").split("\n").map((e, i) => {
    const [min, max] = e.trim().split("-").map(Number)
    return { min, max, i }
}).sort((a, b) => a.min - b.min)
let count = 0;
let min = 0;
while (input.length) {
    const found = input.filter(i => i.min <= min)
    if (found.length != 0) {
        const tempMin = Math.max(...found.map(e => e.max)) + 1
        min = Math.max(min, tempMin)
        input = input.filter((e) => !found.includes(e))
    } else {
        const nextItem = input[0]
        count += (nextItem.min - min)
        min = nextItem.max + 1
    }
}
console.log(count)
