var fs = require("fs");
let idCount = 0;
let arr = [];
let a = new Date();
var input = fs.readFileSync("Day9.txt", "utf8").split("").map((item, index) => {
    let id = '.'
    if (index % 2 == 0) {
        id = `${idCount++}`
    }
    return {
        number: Number(item),
        id
    }
})
input.map((item, index) => {
    for (let i = 0; i < item.number; i++) {
        arr.push(item.id)
    }
})
let reverseArr = [...arr].reverse();
let freeCount = arr.filter(x => x == '.').length
for (let i = 0; i < freeCount; i++) {
    const freeIndex = arr.indexOf('.');
    let blockIndex = 0;
    for (let tempI = 0; tempI < reverseArr.length; tempI++) {
        const element = reverseArr[tempI];
        if (element !== '.') {
            blockIndex = tempI;
            break;
        }
    }
    if (!arr.slice(0, arr.length - 1 - blockIndex).includes('.')) {
        break
    }
    arr[freeIndex] = reverseArr[blockIndex];
    arr[arr.length - 1 - blockIndex] = '.'
    reverseArr = [...arr].reverse();
}
let result = 0
for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (element == '.') break
    result += (element * index)
}
console.log(result);
console.log((new Date() - a))