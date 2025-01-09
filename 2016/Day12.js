var fs = require("fs");
let input = fs.readFileSync("Day12.txt", "utf8").split("\n").map(e => e.trim());
const run = (obj) => {
    for (let index = 0; index < input.length; index++) {
        const element = input[index];
        if (element.includes("cpy")) {
            let [a, b, c] = element.split(" ")
            if (Object.keys(obj).includes(b)) b = obj[b]
            obj[c] = Number(b)
        }
        if (element.includes("inc")) {
            let [a, b] = element.split(" ")
            obj[b] += 1
        }
        if (element.includes("dec")) {
            let [a, b] = element.split(" ")
            obj[b] -= 1
        }
        if (element.includes("jnz")) {
            let [a, b, c] = element.split(" ")
            if (Object.keys(obj).includes(b)) b = obj[b]
            if (b != 0) {
                index += Number(c) - 1
            }
        }
    }
    return obj.a
}
console.log(run({ a: 0, b: 0, c: 0, d: 0 }))
console.log(run({ a: 0, b: 0, c: 1, d: 0 }))