var fs = require("fs");
let input = fs.readFileSync("Day13.txt", "utf8").split("\n").map(e => e.trim())
let data = [[]];
input.forEach((line) => {
    if (line.length) {
        data[data.length - 1].push(line)
    } else {
        data.push([])
    }
})
data = data.map(([a, b, price]) => {
    const aNumbers = a.match(/\+(\d+)/g).map(match => match.replace("+", ""));
    const bNumbers = b.match(/\+(\d+)/g).map(match => match.replace("+", ""));
    const priceNumbers = price.match(/\=(\d+)/g).map(match => match.replace("=", ""));
    return {
        a: aNumbers.map(Number), b: bNumbers.map(Number), price: priceNumbers.map(Number)
    }
})
const result = data.map(({ a, b, price }) => {
    let [x1, y1] = a;
    let [x2, y2] = b;
    let [x3, y3] = price;
    let x1Max = Math.floor(x3 / x1)
    let x2Max = Math.floor(x3 / x2)
    let y1Max = Math.floor(y3 / y1)
    let y2Max = Math.floor(y3 / y2)
    let aMax = Math.min(x1Max, y1Max)
    let bMax = Math.min(x2Max, y2Max)
    const max = Math.max(aMax, bMax)
    let prices = [];
    for (let i = 1; i <= max; i++) {
        for (let j = 1; j <= max; j++) {
            if (((x1 * i) + (x2 * j) == x3) && ((y1 * i) + (y2 * j) == y3)) {
                prices.push(i * 3 + j)
            }
        }
    }
    return prices.length ? Math.min(...prices) : 0
})
console.log(result.reduce((acc, price) => {
    acc += price
    return acc;
}, 0))
