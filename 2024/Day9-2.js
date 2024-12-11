var fs = require("fs");
let idCount = 0;
let arr = [];
var input = fs.readFileSync("Day9.txt", "utf8").split("").map((item, index) => {
    let id = '.'
    if (index % 2 == 0) {
        id = `${idCount++}`
    }
    for (let i = 0; i < Number(item); i++) {
        arr.push(id)
    }
})
let freeIndexGroup = [[]];
let blockIndexGroup = [[]];
let prev = 0;
for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (element !== '.') {
        if (freeIndexGroup[freeIndexGroup.length - 1].length != 0) {
            freeIndexGroup.push([])
        }
        if (prev != element) {
            blockIndexGroup.push([index]);
        } else {
            blockIndexGroup[blockIndexGroup.length - 1].push(index);
        }
        prev = element
    } else {
        freeIndexGroup[freeIndexGroup.length - 1].push(index);
        if (blockIndexGroup[blockIndexGroup.length - 1].length != 0) {
            blockIndexGroup.push([])
        }
        prev = '-1'
    }
}
blockIndexGroup = blockIndexGroup.reverse().filter(e => e.length);
freeIndexGroup = freeIndexGroup.filter(e => e.length);
blockIndexGroup.map(group => {
    const possibleGroups = freeIndexGroup.filter((g) => group[0] > g[0] && g.length >= group.length);
    if (possibleGroups.length) {
        const freeGroup = possibleGroups[0];
        for (let bi = 0; bi < group.length; bi++) {
            const blockIndex = group[bi];
            const freeIndex = freeGroup[bi];
            arr[freeIndex] = arr[blockIndex];
            arr[blockIndex] = '.'
        }
        for (let bi = 0; bi < group.length; bi++) {
            freeGroup.shift()
        }
    }
})
let result = 0
for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (element == '.') continue
    result += (element * index)
}
console.log(result);