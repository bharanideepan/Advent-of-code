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
input.map(i => {
    i.sub?.map((s) => {
        dict[s].parent = i.name
    })
})
const modified = input.map(i => {
    i.sub = i.sub?.map((s) => {
        return {
            name: s,
            weight: dict[s].weight,
            parent: dict[s].parent
        }
    })
    i.sum = i.sub?.reduce((acc, val) => {
        acc += val.weight;
        return acc;
    }, i.weight)
    i.parent = dict[i.name].parent
    return i;
}).filter(e => e.sub)
console.log(JSON.stringify(modified))
// const bottomTower = Object.values(dict).find(({ parent }) => parent == null).name
// console.log(bottomTower)