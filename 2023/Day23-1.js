function findLongestHike(trailMap, row, col, visited, currentLength) {
  if (
    row < 0 ||
    row >= trailMap.length ||
    col < 0 ||
    col >= trailMap[0].length ||
    visited[row][col] ||
    trailMap[row][col] === "#"
  ) {
    return currentLength;
  }

  visited[row][col] = true;

  const moves = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
  ];

  let maxLength = currentLength;

  for (const move of moves) {
    const newRow = row + move[0];
    const newCol = col + move[1];

    if (
      newRow >= 0 &&
      newRow < trailMap.length &&
      newCol >= 0 &&
      newCol < trailMap[0].length &&
      !visited[newRow][newCol] &&
      trailMap[newRow][newCol] !== "#"
    ) {
      const item = trailMap[newRow][newCol];
      if (["v", ">", "<", "^"].includes(item)) {
        const slopeDirections = {
          v: [1, 0],
          ">": [0, 1],
          "<": [0, -1],
          "^": [-1, 0],
        };
        const slopeDirection = slopeDirections[item];

        if (JSON.stringify(slopeDirection) !== JSON.stringify(move)) {
          continue;
        }
      }

      const length = findLongestHike(
        trailMap,
        newRow,
        newCol,
        visited,
        currentLength + 1
      );

      maxLength = Math.max(maxLength, length);
    }
  }

  visited[row][col] = false;

  return maxLength;
}

function longestHike(trailMap) {
  const rows = trailMap.length;
  const cols = trailMap[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const result = findLongestHike(trailMap, 0, 1, visited, 0);
  return result;
}

const x = `#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#`;
const input = x
  .trim()
  .split("\n")
  .map((line) => line.trim());

console.log("Longest hike:", longestHike(input));
