var fs = require("fs");
const lists = [[], []]
fs.readFileSync("Day1input.txt", "utf8").split("\n").map((i) => {
  x = i.split("   ").map(e => parseInt(`${e.trim()}`))
  lists[0].push(x[0])
  lists[1].push(x[1])
})
const fn = (a, b) => a - b
lists[0] = lists[0].sort(fn)
lists[1] = lists[1].sort(fn)
const getOutput = (part1 = true) => lists[0].reduce((sum, val, index) =>
  sum + (part1 ? Math.abs(val - lists[1][index]) : val * lists[1].filter(e => e == val).length),
  0);
console.log(getOutput());
console.log(getOutput(false));

// Simple array manipulation