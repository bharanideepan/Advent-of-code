var fs = require("fs");
const dict = {}
var input = fs.readFileSync("Day7.txt", "utf8").split("\n").map((line) => {
    const [x, y] = line.split("->").map(e => e.trim());
    let [name, weight] = x.split(" (").map(e => e.trim());
    weight = Number(weight.replace(")", ""));
    const result = { name, weight }
    dict[name] = {
        name, weight, parent: null
    }
    if (y) {
        const sub = y.split(",").map(e => e.trim())
        result.sub = sub
    }
    return result
})
// console.log(input)
input.map(i => {
    i.sub?.map((s) => {
        dict[s].parent = i.name
    })
})
const bottomTower = Object.values(dict).find(({ parent }) => parent == null).name
console.log(bottomTower)