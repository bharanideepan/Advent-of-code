const fs = require('fs');
const data = fs.readFileSync('Day14input.txt', 'utf8');
const input = data.split('\n').map((x) => x.split(' -> ').map((y) => y.split(',').map(z => Number(z))));

const xArr = [];
const yArr = [];
input.forEach(element => {
  element.forEach(coordinate => {
    const [y, x] = coordinate
    xArr.push(x)
    yArr.push(y)
  })
});
const xStart = 0
const xEnd = Math.max(...xArr) + 1;
const yStart = Math.min(...yArr);
const yEnd = Math.max(...yArr)
let width = xEnd - xStart + 2;
const actualHt = yEnd - yStart + 1;
const height = actualHt + (10 * actualHt);
const getList = (start, end) => {
  const [x1, y1] = start;
  const [x2, y2] = end;
  const arr = []
  if (x1 === x2) { //vertical
    if (y1 < y2) {
      for (let j = y1 + 1; j <= y2; j++) {//down
        arr.push([x1, j])
      }
    }
    if (y1 > y2) {
      for (let j = y1 - 1; j >= y2; j--) {//up
        arr.push([x1, j])
      }
    }
  } else if (y1 === y2) { //horizontal
    if (x1 < x2) {
      for (let i = x1 + 1; i <= x2; i++) {//right
        arr.push([i, y1])
      }
    }
    if (x1 > x2) {
      for (let i = x1 - 1; i >= x2; i--) {//left
        arr.push([i, y1])
      }
    }
  }
  return arr;
}
let rocks = [];
for (let index = 0; index < input.length; index++) {
  const pathArr = input[index];
  let pathList = [pathArr[0]];
  for (let index2 = 1; index2 < pathArr.length; index2++) {
    const start = pathList[pathList.length - 1];
    const end = pathArr[index2]
    pathList = [...pathList, ...getList(start, end)];
  }
  rocks = [...rocks, ...pathList.map(x => [x[0] - yStart, x[1]].join())]
}

let cave = [];
let count = 0
for (let i = 0; i < width; i++) {
  cave[i] = [];
  for (let j = 0; j < height; j++) {
    const [x, y] = [i, j - (5 * actualHt)];
    if (rocks.includes(`${y},${x}`) || i === width - 1) {
      count++
      cave[i][j] = '#';
    } else {
      cave[i][j] = '.';
    }
  }
}
const printCave = () => {
  for (let index = 0; index < cave.length; index++) {
    const element = cave[index].join('');
    console.log(element)
  }
}

const getValue = (x, y) => {
  let [newX, newY] = [x, y];
  let value = cave[x]?.[y];
  return { newX, newY, value };
}

const getEnd = (pos) => {
  let [x, y] = pos;
  const [dx, dy] = [x + 1, y]
  const { value: downEl } = getValue(dx, dy);
  if (downEl === undefined) {
    return [-1, -1]; //abyss
  }
  if (downEl === '.') { //check down
    return getEnd([dx, dy])
  } else if (downEl === '#' || downEl === 'O') {
    const [lx2, ly2] = [x + 1, y - 1]
    const { value: leftDownEl } = getValue(lx2, ly2);
    if (leftDownEl === undefined) {
      return [-1, -1] //abyss
    } else if (leftDownEl === '.') {
      return getEnd([lx2, ly2]) //check left
    } else if (leftDownEl === 'O' || leftDownEl === '#') {
      const [rx2, ry2] = [x + 1, y + 1]
      const { value: rightDownEl } = getValue(rx2, ry2);
      if (rightDownEl === undefined) {
        return [-1, -1] //abyss
      } else if (rightDownEl === '.') {
        return getEnd([rx2, ry2]) //check right
      } else if (rightDownEl === 'O' || rightDownEl === '#') {
        return [x, y]
      }
      return [x, y];
    }
  }
  return [x, y];
}

const xx = 500 - yStart + (5 * actualHt)
const start = [xStart, xx]
let index = 0;

while (true) {
  const [endX, endY] = getEnd(start);
  const [startPos, endPos] = [`${endX},${endY}`, `${start[0]},${start[1]}`]
  if (startPos === endPos) {
    printCave()
    console.log('Part 2 => ', index + 1)
    break;
  }
  cave[endX][endY] = 'O';
  index++
}
