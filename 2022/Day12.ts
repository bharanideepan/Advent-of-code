const fs = require('fs');
const data = fs.readFileSync('Day12input.txt', 'utf8');
const mock = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  S: 0,
  E: 27
}
let start = [];
let end = [];
const inputData = data.toString().split('\n').map((a, i) => a.split('').map((b, j) => {
  if (b === 'S') {
    start = [i, j]
  } else if (b === 'E') {
    end = [i, j]
  }
  return mock[b]
}));

const getRight = (i, j) => {
  const location = { x: i, y: j + 1 }
  const value = inputData[location.x]?.[location.y];
  return { location, value }
};
const getLeft = (i, j) => {
  const location = { x: i, y: j - 1 }
  const value = inputData[location.x]?.[location.y];
  return { location, value }
};
const getUp = (i, j) => {
  const location = { x: i - 1, y: j }
  const value = inputData[location.x]?.[location.y];
  return { location, value }
};
const getDown = (i, j) => {
  const location = { x: i + 1, y: j }
  const value = inputData[location.x]?.[location.y];
  return { location, value }
};
const visited = [];
let index = -1
let flag = true;
let stepsObj = {}
let result1 = 0;
let arr = [start];

while (flag) {
  index++
  const [i, j] = arr[index];
  const currentPosString = `${i},${j}`;
  if (visited.includes(currentPosString)) {
    continue;
  }
  visited.push(`${i},${j}`);
  const current = inputData[i][j]
  const near = [getRight(i, j), getLeft(i, j), getUp(i, j), getDown(i, j)]
  const endPosString = `${end[0]},${end[1]}`
  if (currentPosString === endPosString) {
    result1 = stepsObj[endPosString]
    flag = false;
  }
  for (let index2 = 0; index2 < near.length; index2++) {
    const { location, value } = near[index2];
    const locationString = `${location.x},${location.y}`;
    if (value === undefined || current + 1 < value || visited.includes(locationString)) {
      continue;
    }
    let count2 = stepsObj[currentPosString] ?? 0
    if (current === 1) { //for part 2
      count2 = 0
    }
    arr.push([location.x, location.y])
    stepsObj[locationString] = count2 + 1
  }
}

console.log('Part1 => ', result1)
