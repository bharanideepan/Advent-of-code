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
layers = layers.map((layer) => {
    let tempLayer = [];
    layer.map((e, i) => {
        if ((i) % width == 0) {
            tempLayer.push([e])
        } else {
            tempLayer[tempLayer.length - 1].push(e)
        }
    });
    return tempLayer;
})
let x1 = [];
for (let a = 0; a < height; a++) {
    const tempLayer = [];
    for (let b = 0; b < width; b++) {
        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            const item = layer[a][b];
            if (item == '0' || item == '1') {
                tempLayer.push(item === '0' ? ' ' : '#')
                break;
            }
        }
    }
    x1.push(tempLayer);
}
x1.map(e => {
    console.log(e.join(""))
})