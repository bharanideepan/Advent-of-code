var fs = require('fs');
var data = fs.readFileSync('Day4input.txt', 'utf8');

var input = data.toString()
  .split('\n').map((e) => e.split(',').map((e) => {
    const x = e.split('-')
    const y = [];
    const [a, b] = [Number(x[0]), Number(x[1])]
    for (let index = a; index <= b; index++) {
      y.push(index);
    }
    return y
  }))

let result = 0;
let result2 = 0;

input.forEach(element => {
  const [a, b] = element;
  const flag1 = a.every((i) => b.includes(i))
  const flag2 = b.every((i) => a.includes(i))
  const flag3 = a.some((i) => b.includes(i))
  result += flag1 || flag2 ? 1 : 0
  result2 += flag3 ? 1 : 0

});
console.log('part1 => ', result)
console.log('part2 => ', result2)
