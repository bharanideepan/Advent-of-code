var fs = require("fs");
const obj = {}
var input = fs.readFileSync("Day14.txt", "utf8").split("\n").map(e => {
    const [a, b] = e.trim().split(" -> ").map(e1 => e1.trim())
    obj[a] = b
})
let polimer = 'PKHOVVOSCNVHHCVVCBOH';
for (let index = 0; index < 10; index++) {
    const split = polimer.split("")
    const pairs = [];
    for (let i = 0; i < split.length - 1; i++) {
        pairs.push(`${split[i]}${split[i + 1]}`)
    }
    const newPolimerArr = pairs.map((pair) => {
        if (obj[pair]) {
            const [a, b] = pair.split("")
            return `${a}${obj[pair]}${b}`
        } else {
            return pair
        }
    })
    const newPolimer = newPolimerArr.reduce((acc, val, ind, arr) => {
        if (ind == 0) return val;
        return acc + val.split("").slice(1, arr.length).join("")
    }, "")
    polimer = newPolimer;
    let obj2 = {};
    polimer.split("").map(e => {
        obj2[e] = obj2[e] ? obj2[e] + 1 : 1;
    })
    // console.log(polimer.length);
    // console.log(obj2);
    console.log(Math.max(...Object.values(obj2)) - Math.min(...Object.values(obj2)))
}