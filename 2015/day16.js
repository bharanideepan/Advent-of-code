var fs = require("fs");
let x = fs.readFileSync("Day16-input.txt", "utf8").split("\n").reduce((acc, e) => {
    const [a, b] = e.trim().split(':').map(e1 => e1.trim())
    return { ...acc, [a]: Number(b) }
}, {})
let input = fs.readFileSync("Day16.txt", "utf8").split("\n").map((sue) => {
    let [a, ...b] = sue.trim().split(":").map(e => e.trim())
    b = b.join(":").split(",").reduce((acc, e) => {
        const [a1, b1] = e.trim().split(":").map(e1 => e1.trim())
        return { ...acc, [a1]: Number(b1) }
    }, {})
    return { a, b }
})
let ct = ["cats", "trees"]
let pg = ["pomeranians", "goldfish"]
let part1 = input.reduce((target, { a, b }) => (Object.keys(b).every((key) => b[key] == x[key])) ? a : target, "")
let part2 = input.reduce((target, { a, b }) => (Object.keys(b).every((key) => ct.includes(key) ? b[key] >= x[key] : pg.includes(key) ? b[key] <= x[key] : b[key] == x[key])) ? a : target, "")
console.log(part1, part2)                                                     