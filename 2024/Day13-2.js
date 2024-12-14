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
let result = 0;
data.map(({ a, b, price }) => {
    let [x1, y1] = a;
    let [x2, y2] = b;
    let [x3, y3] = price;
    [x3, y3] = [x3 + 10000000000000, y3 + 10000000000000]

    let x = (x3 * y2 - y3 * x2) / (x1 * y2 - y1 * x2);
    let y = (x1 * y3 - y1 * x3) / (x1 * y2 - y1 * x2);

    if (x % 1 == 0 && y % 1 == 0) {
        result += x * 3 + y;
    }
})
console.log(result);