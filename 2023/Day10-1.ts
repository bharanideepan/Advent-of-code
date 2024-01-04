const fs = require("fs");
const { Path } = require("path"); // Import the relevant Path module for your JavaScript environment

function readGrid2D(day) {
  const content = fs.readFileSync("Day10-oldinput.txt", "utf-8");
  return content.split("\n").map((line) => line.trim().split(""));
}

// Input parsing
const lines = readGrid2D("10");

const start = [111, 62]; // x, y

// Part 1
console.log("PART 1:");
let ans = 1;

const arr = [start];
let pos = [start[0], start[1] - 1];
let lastMove = [0, -1];

while (lines[pos[1]][pos[0]] !== "S") {
  arr.push([...pos]);
  const tile = lines[pos[1]][pos[0]];

  if (tile === "|" && lastMove[0] === 0) {
    if (lastMove[1] === 1) {
      pos[1] += 1;
    } else if (lastMove[1] === -1) {
      pos[1] -= 1;
    }
  } else if (tile === "-" && lastMove[1] === 0) {
    if (lastMove[0] === 1) {
      pos[0] += 1;
    } else if (lastMove[0] === -1) {
      pos[0] -= 1;
    }
  } else if (tile === "7") {
    if (lastMove[0] === 1 && lastMove[1] === 0) {
      pos[1] += 1;
      lastMove = [0, 1];
    } else if (lastMove[0] === 0 && lastMove[1] === -1) {
      pos[0] -= 1;
      lastMove = [-1, 0];
    }
  } else if (tile === "J") {
    if (lastMove[0] === 1 && lastMove[1] === 0) {
      pos[1] -= 1;
      lastMove = [0, -1];
    } else if (lastMove[0] === 0 && lastMove[1] === 1) {
      pos[0] -= 1;
      lastMove = [-1, 0];
    }
  } else if (tile === "L") {
    if (lastMove[0] === -1 && lastMove[1] === 0) {
      pos[1] -= 1;
      lastMove = [0, -1];
    } else if (lastMove[0] === 0 && lastMove[1] === 1) {
      pos[0] += 1;
      lastMove = [1, 0];
    }
  } else if (tile === "F") {
    if (lastMove[0] === -1 && lastMove[1] === 0) {
      pos[1] += 1;
      lastMove = [0, 1];
    } else if (lastMove[0] === 0 && lastMove[1] === -1) {
      pos[0] += 1;
      lastMove = [1, 0];
    }
  }
  ans += 1;
}

console.log(ans / 2);

// Part 2
console.log("PART 2:");
fs.writeFileSync("sample.json", JSON.stringify(arr));
let originalArr = [];

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[0].length; x++) {
    originalArr.push([x, y]);
  }
}
fs.writeFileSync("original.json", JSON.stringify(arr));
// console.log(arr);
// let ans2 = 0;

// const p = new Path(arr);
// for (let y = 0; y < lines.length; y++) {
//   for (let x = 0; x < lines[0].length; x++) {
//     if (arr.some((point) => point[0] === x && point[1] === y)) {
//       continue;
//     }
//     if (p.containsPoint([x, y])) {
//       ans2 += 1;
//     }
//   }
// }

// console.log(ans2);
