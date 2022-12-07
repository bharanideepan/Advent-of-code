var fs = require('fs');
var data = fs.readFileSync('Day3input.txt', 'utf8');

var input = data.toString()
  .split('\n').map((e) => e.split(''))

const result = [];

const a = {
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
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52
}

let j = 0;

input.forEach((e, i) => {
  const splitInHalf = arr => [arr.slice(0, Math.ceil(arr.length / 2)), arr.slice(Math.ceil(arr.length / 2))];
  const half = splitInHalf(e)
  const filteredArray = half[0].filter(value => half[1].includes(value));
  const removeDuplicates = (arr) => {
    return arr.filter((item,
      index) => arr.indexOf(item) === index);
  }
  const arr = removeDuplicates(filteredArray);
  arr.forEach((element, i) => {
    j += a[element]
  });
});

console.log('part1 => ', j)

var input2 = data.toString()
  .split('\n')

const groups = [];
let temp = []

input2.forEach((e, i) => {
  temp.push([...e])
  if (i !== 0 && (i + 1) % 3 === 0) {
    groups.push(temp)
    temp = []
  }
});

let res = []

function commonElementsOfArray(arr1, arr2, arr3) {
  const arrays = [arr1, arr2, arr3]
  return arrays.shift().reduce(function (res, v) {
    if (res.indexOf(v) === -1 && arrays.every(function (a) {
      return a.indexOf(v) !== -1;
    })) res.push(v);
    return res;
  }, []);
}

groups.forEach(element => {
  res.push(commonElementsOfArray(element[0], element[1], element[2]))
});

j = 0
res.forEach((element, i) => {
  element.forEach((n) => {
    j += a[n]
  })
});

console.log('part2 => ', j)
