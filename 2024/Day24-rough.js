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
    const result = [];

    function getCombinations(arr) {
        const n = arr.length;
        const combinations = [];

        outer: for (let i = 0; i < n - 1; i++) {
            for (let j = i + 1; j < n; j++) {
                const pair1 = [arr[i], arr[j]];
                for (let k = 0; k < n - 1; k++) {
                    if (k === i || k === j) continue;
                    for (let l = k + 1; l < n; l++) {
                        if (l === i || l === j) continue;
                        const pair2 = [arr[k], arr[l]];
                        for (let m = 0; m < n - 1; m++) {
                            if (m === i || m === j || m === k || m === l) continue;
                            for (let o = m + 1; o < n; o++) {
                                if (o === i || o === j || o === k || o === l) continue;
                                const pair3 = [arr[m], arr[o]];
                                for (let p = 0; p < n - 1; p++) {
                                    if (p === i || p === j || p === k || p === l || p === m || p === o) continue;
                                    for (let q = p + 1; q < n; q++) {
                                        if (q === i || q === j || q === k || q === l || q === m || q === o) continue;
                                        const pair4 = [arr[p], arr[q]];
                                        const pairs = [pair1, pair2, pair3, pair4];
                                        console.log(pairs);
                                        // combinations.push([pair1, pair2, pair3, pair4]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return combinations;
    }
    return getCombinations(indices)
}

function generateRandomPairs(array, numPairs = 4) {
    let actualPairs = [];
    const seenPairs = new Set();
    while (true) {
        const indices = array.map((_, i) => i);
        const pairs = [
            // [13, 11],
            // [167, 84],
            // [182, 217],
            // [152, 216],
        ];
        while (pairs.length < numPairs) {
            const shuffled = indices.sort(() => 0.5 - Math.random());
            const [index1, index2] = shuffled.slice(0, 2);

            if (!pairs.some(pair => (pair.includes(index1) && pair.includes(index2)))) {
                pairs.push([index1, index2]);
            }
            indices.splice(indices.indexOf(index1), 1);
            indices.splice(indices.indexOf(index2), 1);
        }
        const pairStr = pairs.join()
        if (seenPairs.has(pairStr)) {
            continue;
        }
        seenPairs.add(pairStr);
        console.log(pairs)
        const tempZBinary = getZDecimal(pairs);
        console.log(`${tempZBinary}`, `${tempZBinary}` === `${zBinary}`)
        if (`${tempZBinary}` === `${zBinary}`) {
            actualPairs = pairs;
            console.log(pairs, tempZBinary)
            break;
        }
    }
    return actualPairs;
}

const array = Array.from({ length: 222 }, (_, i) => i + 1);
const result2 = generateRandomPairs(array);
const result3 = result2.reduce((acc, val) => {
    acc = [...acc, ...val.reduce((acc2, val2) => {
        acc2 = [...acc2, y[val2].output]
        return acc2;
    }, [])]
    return acc
}, [])
console.log(result3.sort().join());
