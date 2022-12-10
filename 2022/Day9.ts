const fs = require('fs');
const data = fs.readFileSync('Day9input.txt', 'utf8');
const input = data.toString().split('\n').map((x) => x.split(' '))

let i = 0;
let j = 0;

let headPos = { x: 0, y: 0 }
let tailPos = { x: 0, y: 0 }

let arr = [];

const switchPos = () => {
  const { x, y } = tailPos
  arr.push(`${x},${y}`)
  tailPos = { ...headPos }
}

const moveRight = (distance) => {
  const j = distance + headPos.x;
  for (let i = headPos.x; i < j; i++) {
    const { x: hx } = headPos
    const { x: tx } = tailPos
    if (tx === hx - 1) {
      switchPos()
    }
    headPos.x += 1
  }
}

const moveUp = (distance) => {
  const j = distance + headPos.y;
  for (let i = headPos.y; i < j; i++) {
    const { y: hy } = headPos
    const { y: ty } = tailPos
    if (ty === hy - 1) {
      switchPos()
    }
    headPos.y += 1
  }
}

const moveLeft = (distance) => {
  const j = headPos.x - distance
  for (let i = headPos.x; i > j; i--) {
    const { x: hx } = headPos
    const { x: tx } = tailPos
    if (tx === hx + 1) {
      switchPos()
    }
    headPos.x -= 1
  }
}

const moveDown = (distance) => {
  const j = headPos.y - distance
  for (let i = headPos.y; i > j; i--) {
    const { y: hy } = headPos
    const { y: ty } = tailPos
    if (ty === hy + 1) {
      switchPos()
    }
    headPos.y -= 1
  }
}

input.forEach((element, index) => {
  const [direction, distance] = [element[0], Number(element[1])];
  if (direction === 'R') {
    moveRight(distance)
  }
  if (direction === 'U') {
    moveUp(distance)
  }
  if (direction === 'L') {
    moveLeft(distance)
  }
  if (direction === 'D') {
    moveDown(distance)
  }
});
console.log(headPos)
console.log(tailPos)
const removeDuplicates = (arr) => {
  return arr.filter((item,
    index) => arr.indexOf(item) === index);
}
const arrUnique = removeDuplicates(arr);
console.log('Part1=> ', arrUnique.length + 1)
