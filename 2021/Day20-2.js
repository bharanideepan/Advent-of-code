var fs = require("fs");
var input = fs.readFileSync("Day20.txt", "utf8").split("\n").map(e => e.trim());
let algorithms = [];
let inputImage = [];
let flag = false;
input.forEach((item) => {
    if (item.length == 0) {
        flag = true;
    } else {
        if (flag) {
            inputImage.push(item);
        } else {
            algorithms.push(item);
        }
    }
})
algorithms = algorithms.reduce((acc, val) => {
    acc = [...acc, ...val]
    return acc
}, [])
inputImage = inputImage.map(e => e.split(""))
const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1]];
console.log(algorithms[511])
for (let index = 0; index < 50; index++) {
    const tempItem = index % 2 == 0 ? "." : "#"
    inputImage = inputImage.map((e) => `${tempItem}${e.join("")}${tempItem}`.split(""))
    const newRow = Array(inputImage[0].length).fill(tempItem)
    inputImage.unshift([...newRow])
    inputImage.push([...newRow])
    inputImage = inputImage.map((row, i) => {
        return row.map((item, j) => {
            const binary = directions.map(([a, b]) => {
                const temp = inputImage[i + a]?.[j + b] ?? tempItem;
                return temp == "#" ? 1 : 0
            }).join("")
            return algorithms[parseInt(binary, 2)]
        })
    })
    inputImage.map(e => console.log(e.join("")))
    console.log(inputImage.reduce((acc, val) => acc + val.reduce((acc2, val2) => acc2 + (val2 == "#" ? 1 : 0), 0), 0))
}
