const fs = require('fs');
const data = fs.readFileSync('Day6input.txt', 'utf8');
const input = data.toString().split('')

const hasDuplicates = (array) => (new Set(array)).size !== array.length;

const getResult = (length) => {
  for (let i = 0; i < input.length; i++) {
    const temp = input.slice(i, i + length);
    if (temp.length === length && !hasDuplicates(temp)) return i + length
  }
}

console.log('part1 => ', getResult(4))
console.log('part2 => ', getResult(14))