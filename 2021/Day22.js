var fs = require("fs");
var input = fs.readFileSync("Day22.txt", "utf8").split("\n").map(e => {
    const [a, b] = e.trim().split(" ");
    const [x, y, z] = b.split(",").map(e1 => {
        const [start, end] = e1.split("=")[1].split("..").map(Number)
        const temp = [];
        if (start >= end) {
            for (let index = start; index >= end; index--) {
                if (index >= -50 && index <= 50)
                    temp.push(index);

            }
        } else {
            for (let index = start; index <= end; index++) {
                if (index >= -50 && index <= 50)
                    temp.push(index);
            }
        }
        return temp
    })
    return { type: a, x, y, z }
})
obj = {}
input.forEach(i => {
    i.x.map(a => {
        i.y.map(b => {
            i.z.map(c => {
                obj[`${a},${b},${c}`] = i.type == "on"
            })
        })
    })
})
console.log(Object.values(obj).reduce((acc, val) => acc + (val ? 1n : 0n), 0n))