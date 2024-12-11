var fs = require("fs");
const lists = [[], []]
fs.readFileSync("Day1input.txt", "utf8").split("\n").map((i) => {
  x = i.split("   ").map(e => parseInt(`${e.trim()}`))
  lists[0].push(x[0])
  lists[1].push(x[1])
})
const fn = (a,b) => a - b
lists[0] = lists[0].sort(fn)
lists[1] = lists[1].sort(fn)
const count = lists[0].reduce((sum, val, index) => sum + Math.abs(val - lists[1][index]), 0);
console.log(count);
