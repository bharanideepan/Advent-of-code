const fs = require("fs");

// Read data from the file
const data = fs
  .readFileSync("Day24-input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.replace("@", ",").split(",").map(Number));

function solve(a, b) {
  let m = a.map((row, i) => [...row, b[i]]);

  for (let i = 0; i < m.length; i++) {
    m[i] = m[i].map((val, k) => val / m[i][i]);

    for (let j = i + 1; j < m.length; j++) {
      m[j] = m[j].map((val, k) => val - m[i][k] * m[j][i]);
    }
  }

  for (let i = m.length - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      m[j] = m[j].map((val, k) => val - m[i][k] * m[j][i]);
    }
  }
  console.log(m);
  return m.map((row) => row[row.length - 1]);
}

function cols(a, b, c, d) {
  const A = data.map((row) => [row[c], -row[d], row[a], row[b]]);
  const B = data.map((row) => row[b] * row[c] - row[a] * row[d]);
  return [A, B];
}

const [x, y, _] = solve(...cols(0, 1, 3, 4));
const [z, __] = solve(...cols(1, 2, 4, 5));

console.log(x, y, z);
console.log(x + y + z);
