var fs = require('fs');
var data = fs.readFileSync('Day1input.txt', 'utf8');

var input = data.toString()
  .split('\n\n').map((e) => e.split('\n'))

let result = {
  id: 0, value: 0
}
let arr = []
input.forEach((element, index) => {
  const sum = element.reduce((partialSum, a) => partialSum + Number(a), 0);
  arr.push(sum)
  if (sum > result.value) {
    result = { id: index, value: sum }
  }
});

console.log('part1 => ', result.value)
const x = arr.sort((a, b) => b - a)
console.log('part2 => ', x[0] + x[1] + x[2])
