const fs = require('fs');
const data = fs.readFileSync('Day13input.txt', 'utf8');
let flatArr = [];
const input = data.split('\n\n').map((x) => x.split('\n').map((y) => {
  flatArr.push(JSON.parse(y))
  return JSON.parse(y)
}))
const x = [2]
const y = [6]
flatArr = [...flatArr, x, y]

const isObject = (item) => typeof item === 'object';
const compare = (x, y) => {
  if (x === undefined) {
    return 'right';
  }
  if (y === undefined) {
    return 'wrong';
  }
  if (!isObject(x) && !isObject(y)) {
    if (x < y) return 'right'
    if (x === y) return 'equal'
    if (x > y) return 'wrong'
  }
  if (!isObject(x) && isObject(y)) {
    const x1 = [x]
    return compare(x1, y)
  }
  if (isObject(x) && !isObject(y)) {
    const y1 = [y]
    return compare(x, y1)
  }
  if (isObject(x) && isObject(y)) {
    let index2 = 0;
    for (let index1 = 0; index1 < x.length; index1++) {
      index2 = index1
      const x1 = x[index1];
      const y1 = y[index1];
      const status = compare(x1, y1);
      if (status !== 'equal') {
        return status;
      }
    }
    if (index2 < y.length) return 'right';
    return 'equal';
  }
}

let count = 0;
for (let index = 0; index < input.length; index++) {
  const [left, right] = input[index];
  const x = compare(left, right);
  console.log(x, index + 1)
  if (x === 'right') {
    count += index + 1
  }
}
flatArr.sort((a, b) => {
  const status = compare(a, b)
  if (status === 'right') return -1
  if (status === 'wrong') return 1
})

console.log('Part1 =>', count)
console.log('Part2 =>', (flatArr.indexOf(x) + 1) * (flatArr.indexOf(y) + 1))
