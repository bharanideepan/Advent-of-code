var fs = require("fs");

// Need improvement

let input = fs.readFileSync("Day9.txt", "utf8").split("\n").map(e => e.trim());
input.map(e => {
    e = e.split("");
    let flag = false;
    let temp = { index: 0, arr: [] }
    let count = 0;
    for (let index = 0; index < e.length; index++) {
        const element = e[index];
        if (element == "(") {
            flag = true
            temp = { index, arr: [] }
            continue;
        }
        if (element == ")") {
            flag = false
            const [x, y] = temp.arr.join("").split("x").map(Number)
            let sliced = e.slice(index + 1, index + 1 + x).join("")
            sliced = Array(y).fill(sliced)
            count += index + 1 - (temp.arr.length + 2)
            e = [...sliced, ...e.slice(index + 1 + x)].join("").split("")
            index = -1
            temp = { index: 0, arr: [] }
            continue;
        }
        if (flag) {
            temp.arr.push(element)
        }
    }
    console.log(e.filter(e1 => e1.length).length + count)
})