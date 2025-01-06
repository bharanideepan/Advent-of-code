var fs = require("fs");
let width = 25;
let height = 6;
let layers = [];
let total = height * width;
var input = fs.readFileSync("Day8.txt", "utf8").split("").map((e, i) => {
    if ((i) % total == 0) {
        layers.push([e])
    } else {
        layers[layers.length - 1].push(e)
    }
});
let resultLayer = layers.reduce((acc, layer) => {
    const count = layer.filter(e => e == '0').length;
    if (acc == undefined || acc.count > count) {
        acc = {
            count: count,
            layer: layer
        }
    }
    return acc
}, undefined)
const resultArr = resultLayer.layer.reduce((acc, val) => {
    if (val === '1') {
        acc[0] = acc[0] + 1
    }
    if (val === '2') {
        acc[1] = acc[1] + 1
    }
    return acc;
}, [0, 0])
console.log(resultArr.reduce((acc, val) => acc * val, 1));