var fs = require("fs");
let input = fs.readFileSync("Day9.txt", "utf8").split("\n").map(e => e.trim());
input.map(e => {
    e = e.split("");
    let flag = false;
    let temp = { index: 0, arr: [] }
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
            e = [...e.slice(0, temp.index), ...sliced, ...e.slice(index + 1 + x)].join("").split("")
            index = index + (x * y) - (temp.arr.length + 2)
            temp = { index: 0, arr: [] }
            continue;
        }
        if (flag) {
            temp.arr.push(element)
        }
    }
    console.log(e.filter(e1 => e1.length).length)
})