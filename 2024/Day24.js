var fs = require("fs");
let x = [];
let y = [];
let flag = false;
var input = fs.readFileSync("Day24.txt", "utf8").split("\n").map(e => {
    e = e.trim();
    if (e.length == 0) {
        flag = true;
    } else {
        if (flag) {
            y.push(e)
        } else {
            x.push(e)
        }
    }
})
let wires = {}
y = y.map((e) => {
    let [a, c] = e.split("->").map(e1 => e1.trim())
    let split = a.split("AND").map(e1 => e1.trim())
    if (split.length == 2) {
        const [a, b] = split;
        wires[a] = -1
        wires[b] = -1
        wires[c] = -1
        return { left: a, right: b, output: c, gate: "AND" }
    }
    split = a.split("XOR").map(e1 => e1.trim())
    if (split.length == 2) {
        const [a, b] = split;
        wires[a] = -1
        wires[b] = -1
        wires[c] = -1
        return { left: a, right: b, output: c, gate: "XOR" }
    }
    split = a.split("OR").map(e1 => e1.trim())
    if (split.length == 2) {
        const [a, b] = split;
        wires[a] = -1
        wires[b] = -1
        wires[c] = -1
        return { left: a, right: b, output: c, gate: "OR" }
    }
})
x = x.map((e) => {
    const [wire, value] = e.split(":").map(e1 => e1.trim())
    wires[wire] = value
    return { wire, value }
})
while (Object.values(wires).includes(-1)) {
    y.map(({ left, right, output, gate }) => {
        if (wires[left] !== -1 && wires[right] !== -1) {
            const [a, b] = [wires[left], wires[right]]
            if (gate === 'AND') {
                if (a == '1' && b == '1') {
                    wires[output] = '1'
                } else {
                    wires[output] = '0'
                }
            } else if (gate === "XOR") {
                if (a !== b) {
                    wires[output] = '1'
                } else {
                    wires[output] = '0'
                }
            } else if (gate === "OR") {
                if (a == '1' || b == '1') {
                    wires[output] = '1'
                } else {
                    wires[output] = '0'
                }
            }
        }
    })
}
let result = Object.keys(wires).filter((e) => e.startsWith("z")).map(e => {
    return {
        order: parseInt(e.replace("z", "")),
        key: e
    }
}).sort((a, b) => b.order - a.order).map(e => Number(wires[e.key])).join("")
console.log(result)
console.log(parseInt(result, 2))
// Part 2 css,cwt,gdd,jmv,pqt,z05,z09,z37
// const pair1 = [167, 84]
// const pair2 = [13, 11]
// const pair3 = [152, 216]
// const pair4 = [182, 217] 