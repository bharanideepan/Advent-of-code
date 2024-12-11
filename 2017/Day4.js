var fs = require("fs");
var input = fs.readFileSync("Day4.txt", "utf8").split("\n")
let sum = 0;
for (let index = 0; index < input.length; index++) {
    const row = input[index];
    const items = row.split(" ").map(e => e.trim());
    const s = new Set();
    let flag = true;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (s.has(item)) {
            flag = false;
            break;
        } else {
            s.add(item)
        }
    }
    if (flag) {
        sum++
    }
}
console.log("Part 1 = ", sum)
sum = 0;
for (let index = 0; index < input.length; index++) {
    const row = input[index];
    const items = row.split(" ").map(e => e.trim());
    const s = new Set();
    let flag = true;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const sortedItem = item.split('').sort().join('')
        if (s.has(sortedItem)) {
            flag = false;
            break;
        } else {
            s.add(sortedItem)
        }
    }
    if (flag) {
        sum++
    }
}
console.log("Part 2 = ", sum)