const fs = require('fs');
const data = fs.readFileSync('Day8input.txt', 'utf8');
const input = data.toString().split('\n').map((x) => x.split('').map((x) => Number(x)))

const isEdge = (i, j) => i === 0 || j === 0 || i === input.length - 1 || j === input[i].length - 1

const analyze = (tree, i, j) => {
  let visibleTrees = [0, 0, 0, 0]; //top, bottom, left, right
  let visibility = [false, false, false, false]; //top, bottom, left, right

  const checkVisibility = (i, j, index) => {
    const x = input[i][j]
    if (x >= tree) {
      visibleTrees[index] = ++visibleTrees[index]
      visibility[index] = false;
      return false;
    } else {
      visibleTrees[index] = ++visibleTrees[index]
    }
    visibility[index] = true;
    return true;
  }

  for (let i1 = i - 1; i1 >= 0; i1--) { //top
    const topVisible = checkVisibility(i1, j, 0)
    if (!topVisible) break
  }
  for (let i1 = i + 1; i1 < input.length; i1++) { //bottom
    const bottomVisible = checkVisibility(i1, j, 1)
    if (!bottomVisible) break
  }
  for (let j1 = j - 1; j1 >= 0; j1--) { //left
    const leftVisibility = checkVisibility(i, j1, 2)
    if (!leftVisibility) break
  }
  for (let j1 = j + 1; j1 < input[i].length; j1++) { //right
    const rightVisibility = checkVisibility(i, j1, 3)
    if (!rightVisibility) break
  }
  const [a, b, c, d] = visibleTrees;
  const [a1, b1, c1, d1] = visibility;
  return {
    scenicScore: a * b * c * d,
    isVisible: a1 || b1 || c1 || d1
  }
}

let visibleTrees = 0;
let scenicScores = [];

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (isEdge(i, j)) {
      ++visibleTrees
    } else {
      const tree = input[i][j];
      const x = analyze(tree, i, j)
      if (x.isVisible) {
        ++visibleTrees;
      }
      scenicScores.push(x.scenicScore)
    }
  }
}

console.log('Part1 =>', visibleTrees)
console.log('Part2 =>', Math.max(...scenicScores))