var fs = require("fs");
let input = fs.readFileSync("day20.txt", "utf8").split("\n").map((e, i) => {
    const [min, max] = e.trim().split("-").map(Number)
    return { min, max, i }
})
let min = 0;
while (true) {
    const found = input.filter(i => i.min <= min)
    if (found.length != 0) {
        const tempMin = Math.max(...found.map(e => e.max)) + 1
        min = Math.max(min, tempMin)
        const indices = found.map(e => e.i)
        input = input.filter((e) => !indices.includes(e.i))
    } else {
        break;
    }
}
console.log(min)
