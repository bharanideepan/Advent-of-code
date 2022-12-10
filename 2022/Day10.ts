const fs = require('fs');
const data = fs.readFileSync('Day10input.txt', 'utf8');
const input = data.toString().split('\n');

let cycle = 0;
let x = 1;
let sum = 0;
let i = -20;

let crt = [[], [], [], [], [], []];
let crtRow = 0;
let spritePos = '###.....................................';

const incrementCycle = () => {
  ++cycle
  if (cycle === 20) {
    i = 60
    sum += x * cycle;
  }
  if (cycle === i) {
    i += 40;
    sum += x * cycle;
  }
  updateSpritePos()
  drawCrt();
}

const drawCrt = () => {
  if (crt[crtRow].length === 40) {
    crtRow += 1;
  }
  const currentCrt = crt[crtRow];
  let index = (cycle % 40) - 1;
  currentCrt.push(spritePos.charAt(index))
}

const updateSpritePos = () => {
  const positions = [x - 1, x, x + 1]
  spritePos = ''
  for (let index = 0; index < 40; index++) {
    const char = positions.includes(index) ? '#' : '.'
    spritePos += char;
  }
}

input.forEach(element => {
  if (element === 'noop') {
    incrementCycle()
  } else {
    const arr = element.split(' ');
    const value = Number(arr[1]);
    incrementCycle()
    incrementCycle()
    x += value;
  }
});

console.log('Part1 => ', sum)
console.log('Part2 => ')

for (let index = 0; index < 6; index++) {
  const element = crt[index];
  console.log(element.join(''))
}
