const parsed = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`
  .split(`\n\n`)
  .map((pattern) => pattern.split("\n").map((line) => line.trim().split("")));

function transposeArray(array) {
  const rows = array.length;
  const cols = array[0].length;
  const transposedArray = [];
  for (let i = 0; i < cols; i++) {
    const newRow = [];
    for (let j = 0; j < rows; j++) {
      newRow.push(array[j][i]);
    }
    transposedArray.push(newRow);
  }
  return transposedArray;
}
const diff = (a, b) => {
  let diffs = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) diffs++;
  }
  return diffs;
};

function getCount(grid) {
  outer: for (let r = 0; r < grid.length - 1; r++) {
    let diffs = diff(grid[r], grid[r + 1]);
    if (diffs <= 1) {
      const rowsBelow = r;
      const rowsAbove = grid.length - r;
      for (let i = 0; i < Math.min(rowsBelow, rowsAbove); i++) {
        const lowRow = r - i - 1;
        const highRow = r + 2 + i;
        if (lowRow < 0 || highRow >= grid.length) break;
        diffs += diff(grid[lowRow], grid[highRow]);
        if (diffs > 1) continue outer;
      }
      if (diffs === 1) {
        return r + 1;
      }
    }
  }
  return 0;
}

let result = 0;
for (const pattern of parsed) {
  const transposedPattern = transposeArray(pattern);
  const [verticalCount, horizontalCount] = [
    getCount(transposedPattern),
    getCount(pattern),
  ];
  result += 100 * horizontalCount + verticalCount;
}

console.info(result);
