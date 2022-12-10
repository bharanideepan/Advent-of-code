const fs = require('fs');
const data = fs.readFileSync('Day9input.txt', 'utf8');
const input = data.toString().split('\n').map((line) => line.split(' '));

const positions = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
]
const resultArr = [];

const addTailPos = () => {
  const { x, y } = positions[positions.length - 1]
  resultArr.push(`${x},${y}`);
}

const removeDuplicates = (arr) => {
  return arr.filter((item,
    index) => arr.indexOf(item) === index);
}

const moveHead = (direction) => {
  const { x, y } = positions[0];
  switch (direction) {
    case 'D':
      return { x, y: y - 1 }
    case 'U':
      return { x, y: y + 1 }
    case 'L':
      return { x: x - 1, y }
    case 'R':
      return { x: x + 1, y }
  }
}
const noMovement = ['1,0', '0,0', '1,1', '-1,1', '0,1', '-1,-1', '0,-1', '1,-1', '-1,0'] //nearby positions
const moveTailToHead = (i) => {
  const [{ x, y }, head] = [positions[i], positions[i - 1]];
  const differencePos = `${head.x - x},${head.y - y}`
  switch (differencePos) {
    case '2,2':
      return { x: x + 1, y: y + 1 } //d2 - l2
    case '2,1':
      return { x: x + 1, y: y + 1 } //d1 - l2
    case '2,0':
      return { x: x + 1, y } //l2
    case '2,-1':
      return { x: x + 1, y: y - 1 } //u1 - l2
    case '2,-2':
      return { x: x + 1, y: y - 1 } //u2 - l2
    case '1,-2':
      return { x: x + 1, y: y - 1 } //u2 - l1
    case '0,-2':
      return { x, y: y - 1 } //u2
    case '-1,-2':
      return { x: x - 1, y: y - 1 } //u2 - r1
    case '-2,-2':
      return { x: x - 1, y: y - 1 } //u2 - r2
    case '-2,-1':
      return { x: x - 1, y: y - 1 } //u1 - r2
    case '-2,0':
      return { x: x - 1, y } //r2
    case '-2,1':
      return { x: x - 1, y: y + 1 } //d1 - r2
    case '-2,2':
      return { x: x - 1, y: y + 1 } //d2 - r2
    case '-1,2':
      return { x: x - 1, y: y + 1 } //d2 - r1
    case '0,2':
      return { x, y: y + 1 } //d2
    case '1,2':
      return { x: x + 1, y: y + 1 } //d2 - l1
  }
  if (noMovement.includes(differencePos)) { //nearby
    return { x, y }
  }
}

addTailPos();
input.forEach((instruction) => {
  const [direction, distance] = [instruction[0], Number(instruction[1])];
  for (let s = 0; s < distance; s++) {
    positions[0] = moveHead(direction)
    for (let i = 1; i < positions.length; i++) {
      positions[i] = moveTailToHead(i)
    }
    addTailPos()
  }
})

const newArr = removeDuplicates(resultArr)
console.log('Part2=> ', newArr.length)