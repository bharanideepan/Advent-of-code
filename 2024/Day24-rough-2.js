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
let zBinary = decimalToBinary(zDecimal)
function decimalToBinary(decimal) {
    if (decimal === 0) return "0";
    let binary = "";
    while (decimal > 0) {
        binary = (decimal % 2) + binary;
        decimal = Math.floor(decimal / 2);
    }
    return binary;
}
console.log(`Result should be: ${zDecimal}, ${zBinary}`)
const getZDecimal = (pairs) => {
    let tempWires = { ...wires };
    pairs.map((pair) => {
        let [a, b] = pair;
        [y[a].output, y[b].output] = [y[b].output, y[a].output]
    })
    while (Object.values(tempWires).includes(-1)) {
        let xx = Object.values(tempWires).join()
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
        let yy = Object.values(tempWires).join()
        if (xx == yy) break;
    }
    let result = Object.keys(tempWires).filter((e) => e.startsWith("z")).map(e => {
        return {
            order: parseInt(e.replace("z", "")),
            key: e
        }
    }).sort((a, b) => b.order - a.order).map(e => Number(tempWires[e.key])).join("")
    return result;
}

function generatePairsToSwap(array) {
    const indices = array.map((_, i) => i);
    const actualPairs = [];
    // const pairs = [
    //     [13, 11],
    //     [167, 84],
    //     [152, 216],
    //     [182, 217]
    // ];
    function getCombinations(arr) {
        const n = arr.length;
        outer: for (let i = 11; i < 15; i++) {
            for (let j = i + 1; j < 15; j++) {
                const pair1 = [arr[i], arr[j]];
                for (let k = 80; k < 180; k++) {
                    if (k === i || k === j) continue;
                    for (let l = k + 1; l < 180; l++) {
                        if (l === i || l === j) continue;
                        const pair2 = [arr[k], arr[l]];
                        for (let m = 150; m < 220; m++) {
                            if (m === i || m === j || m === k || m === l) continue;
                            for (let o = m + 1; o < 220; o++) {
                                if (o === i || o === j || o === k || o === l) continue;
                                const pair3 = [arr[m], arr[o]];
                                for (let p = 180; p < 220; p++) {
                                    if (p === i || p === j || p === k || p === l || p === m || p === o) continue;
                                    for (let q = p + 1; q < 220; q++) {
                                        if (q === i || q === j || q === k || q === l || q === m || q === o) continue;
                                        const pair4 = [arr[p], arr[q]];
                                        const pairs = [pair1, pair2, pair3, pair4];
                                        console.log(pairs);
                                        const tempZBinary = getZDecimal(pairs);
                                        // console.log(`${tempZBinary}`, `${tempZBinary}` === `${zBinary}`)
                                        if (`${tempZBinary}` === `${zBinary}`) {
                                            actualPairs = pairs;
                                            console.log(pairs, tempZBinary)
                                            return actualPairs;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return getCombinations(indices)
}

const array = Array.from({ length: 222 }, (_, i) => i + 1);
const result2 = generatePairsToSwap(array)
const result3 = result2.reduce((acc, val) => {
    acc = [...acc, ...val.reduce((acc2, val2) => {
        acc2 = [...acc2, y[val2].output]
        return acc2;
    }, [])]
    return acc
}, [])
console.log(result3.sort().join());
