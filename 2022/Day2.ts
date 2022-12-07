var fs = require('fs');
var data = fs.readFileSync('Day2input.txt', 'utf8');

var input = data.toString()
  .split('\n').map((e) => e.split(' '))

const win = {
  'A': 'Y',
  'B': 'Z',
  'C': 'X',
}
const lose = {
  'A': 'Z',
  'B': 'X',
  'C': 'Y',
}
const draw = {
  'A': 'X',
  'B': 'Y',
  'C': 'Z',
}
const prediction = {
  'X': lose,
  'Y': draw,
  'Z': win
}
const score = {
  'AX': 1 + 3,//draw
  'BY': 2 + 3,//draw
  'CZ': 3 + 3,//draw
  'CX': 1 + 6,//win
  'AY': 2 + 6,//win
  'BZ': 3 + 6,//win
  'BX': 1 + 0,//lose
  'CY': 2 + 0,//lose
  'AZ': 3 + 0,//lose
}

const getScore = (his, mine) => score[`${his}${mine}`]
const getPredictedValue = (mine, his) => prediction[mine][his]
let result1 = 0
let result2 = 0
input.forEach((e, i) => {
  result1 += getScore(e[0], e[1]);
  let his = e[0]
  let updatedMine = getPredictedValue(e[1], his)
  result2 += getScore(his, updatedMine)

});

console.log('part1 => ', result1)
console.log('part2 => ', result2)
