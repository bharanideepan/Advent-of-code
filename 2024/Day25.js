var fs = require("fs");
let keySpaces = [];
let lockSpaces = [];
var input = fs.readFileSync("Day25.txt", "utf8").split("\n").map(e => e.trim()).reduce((acc, val) => {
    if (val.length == 0) {
        acc.push([]);
    } else {
        acc[acc.length - 1].push(val.split(""))
    }
    return acc;
}, [[]])
const rotate = (array, right = true) => {
    const rows = array.length;
    const cols = array[0].length;
    const rotatedArray = [];
    if (right) {
        for (let i = 0; i < cols; i++) {
            const newRow = [];
            for (let j = rows - 1; j >= 0; j--) {
                newRow.push(array[j][i]);
            }
            rotatedArray.push(newRow);
        }
    } else {
        for (let i = cols - 1; i >= 0; i--) {
            const newRow = [];
            for (let j = 0; j < rows; j++) {
                newRow.push(array[j][i]);
            }
            rotatedArray.push(newRow);
        }
    }

    return rotatedArray;
};
input.map((e) => {
    if (e[0].includes('.')) {
        keySpaces.push(rotate(e).map(line => line.filter(e => e == '#').length - 1))
    } else {
        lockSpaces.push(rotate(e).map(line => line.filter(e => e == '#').length - 1))
    }
})
let count = 0;
lockSpaces.map((lockSpace) => {
    keySpaces.map((keySpace) => {
        count += lockSpace.every((space, index) => keySpace[index] + space <= 5) ? 1 : 0;
    })
})
console.log(count)