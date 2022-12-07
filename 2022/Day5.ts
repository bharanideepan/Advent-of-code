const fs = require('fs');
let data = fs.readFileSync('Day5input.txt', 'utf8');

let input = data.toString()
  .split('\n\n')

const [a, b] = input;
const obj1 = {};
const obj2 = {};
const a1 = a.split('\n');
const stackArr = a1[a1.length - 1].split('   ').map((x) => x.trim());
const totalLen = a1[a1.length - 1].length;
const totalHeight = a1.length - 1;
let position = 1;
stackArr.forEach(element => {
  for (let index = 0; index < totalHeight; index++) {
    let prev = obj1[element];
    let item = a1[index][position];
    if (item.trim().length) {
      if (prev) {
        obj1[element] = [...prev, a1[index][position]]
        obj2[element] = [...prev, a1[index][position]]
      } else {
        obj1[element] = [a1[index][position]]
        obj2[element] = [a1[index][position]]
      }
    }
  }
  position = position + 4
});

const b1 = b.split('\n').map((x) => {
  const x1 = x.split(' ')
  const res = []
  x1.forEach(element => {
    const number = Number(element);
    if (!isNaN(number)) {
      res.push(number)
    }
  });
  return res
});
b1.forEach(element => {
  const [count, from, to] = element;
  for (let index = 0; index < count; index++) {
    const item = obj1[`${from}`].shift()
    obj1[`${to}`].unshift(item);
  }
  let arr = []
  for (let index = 0; index < count; index++) {
    const item = obj2[`${from}`].shift()
    arr.push(item)
  }
  obj2[`${to}`].unshift(...arr)
});
let result1 = ''
Object.keys(obj1).forEach(element => {
  const item = obj1[element][0]
  result1 += item;
});
console.log('part1 => ', result1)

let result2 = ''
Object.keys(obj2).forEach(element => {
  const item = obj2[element][0]
  result2 += item;
});
console.log('part2 => ', result2)