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
let xValue = Object.keys(wires).filter((e) => e.startsWith("x")).map(e => {
    return {
        order: parseInt(e.replace("x", "")),
        key: e
    }
}).sort((a, b) => b.order - a.order).map(e => Number(wires[e.key])).join("")
let yValue = Object.keys(wires).filter((e) => e.startsWith("y")).map(e => {
    return {
        order: parseInt(e.replace("y", "")),
        key: e
    }
}).sort((a, b) => b.order - a.order).map(e => Number(wires[e.key])).join("")
let zDecimal = parseInt(xValue, 2) + parseInt(yValue, 2);
function decimalToBinary(decimal) {
    if (decimal === 0) return "0"; // Handle the case for 0
    let binary = "";
    while (decimal > 0) {
        binary = (decimal % 2) + binary; // Append the remainder to the binary string
        decimal = Math.floor(decimal / 2); // Reduce the decimal value
    }
    return binary;
}
// 1110000000111000100001111100000110001011001110
// 1101111110111000100001111000000110010011001110
let zBinary = decimalToBinary(zDecimal)
console.log(`Result should be: ${zDecimal}, ${zBinary}`)
let tempWires = { ...wires };
while (Object.values(tempWires).includes(-1)) {
    y.map(({ left, right, output, gate }) => {
        if (tempWires[left] !== -1 && tempWires[right] !== -1) {
            const [a, b] = [tempWires[left], tempWires[right]]
            if (gate === 'AND') {
                if (a == '1' && b == '1') {
                    tempWires[output] = '1'
                } else {
                    tempWires[output] = '0'
                }
            } else if (gate === "XOR") {
                if (a !== b) {
                    tempWires[output] = '1'
                } else {
                    tempWires[output] = '0'
                }
            } else if (gate === "OR") {
                if (a == '1' || b == '1') {
                    tempWires[output] = '1'
                } else {
                    tempWires[output] = '0'
                }
            }
        }
    })
}
let result = Object.keys(tempWires).filter((e) => e.startsWith("z")).map(e => {
    return {
        order: parseInt(e.replace("z", "")),
        key: e
    }
}).sort((a, b) => b.order - a.order).map(e => Number(tempWires[e.key])).join("")
console.log(result)
console.log(parseInt(result, 2))
// css,cwt,gdd,jmv,pqt,z05,z09,z37
// [
//     { output: 'gdd', i: 167 },
//     { output: 'z05', i: 84 },
//     { output: 'cwt', i: 13 },
//     { output: 'z09', i: 11 },
//     { output: 'css', i: 152 },
//     { output: 'jmv', i: 216 },
//     { output: 'pqt', i: 182 },
//     { output: 'z37', i: 217 }
//   ]
const n = y.map((e, i) => ({
    output: e.output, i
})).filter((a, i) => {
    return [
        'gdd', 'z05',
        'cwt', 'z09',
        'css', 'jmv',
        'pqt', 'z37'
    ].includes(a.output)
})
console.log(n)