var fs = require("fs");
let input = fs.readFileSync("Day23.txt", "utf8").split("\n").map(e => e.trim());
const run = (obj) => {
    for (let index = 0; index < input.length; index++) {
        const element = input[index];
        if (element.includes("cpy")) {
            let [a, b, c] = element.split(" ")
            if (!Object.keys(obj).includes(b) && !Object.keys(obj).includes(c)) continue
            if (Object.keys(obj).includes(b)) b = obj[b]
            obj[c] = Number(b)
        }
        if (element.includes("inc")) {
            let [a, b] = element.split(" ")
            if (!Object.keys(obj).includes(b)) continue
            obj[b] += 1
        }
        if (element.includes("dec")) {
            let [a, b] = element.split(" ")
            if (!Object.keys(obj).includes(b)) continue
            obj[b] -= 1
        }
        if (element.includes("jnz")) {
            let [a, b, c] = element.split(" ")
            if (Object.keys(obj).includes(b)) b = obj[b]
            if (Object.keys(obj).includes(c)) c = obj[c]
            b = Number(b)
            c = Number(c)
            if (b != 0) {
                index += Number(c) - 1
            }
        }
        if (element.includes("tgl")) {
            let b = element.split(" ")[1]
            if (Object.keys(obj).includes(b)) b = obj[b]
            b = index + Number(b)
            if (b < 0 && b >= input.length) continue
            input = input.map((line, i) => {
                if (i == b) {
                    if (line.includes("cpy")) {
                        return line.replace('cpy', 'jnz')
                    }
                    if (line.includes("inc")) {
                        return line.replace('inc', 'dec')
                    }
                    if (line.includes("tgl")) {
                        return line.replace('tgl', 'inc')
                    }
                    if (line.includes("dec")) {
                        return line.replace('dec', 'inc')
                    }
                    if (line.includes("jnz")) {
                        return line.replace('jnz', 'cpy')
                    }
                }
                return line;
            })
        }
    }
    return obj.a
}
console.log(run({ a: 7, b: 0, c: 0, d: 0 }))
console.log(run({ a: 12, b: 0, c: 1, d: 0 }))
