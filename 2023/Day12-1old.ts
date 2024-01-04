let x = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;
x = `???.### 1,1,3`;
const lines = x.split("\n");
const grid = lines.map((row) => row.split(""));

let DP = {};

function countPossibilities(dots, blocks, i, bi, current) {
  console.log(dots, blocks, i, bi, current);
  const key = `${i}-${bi}-${current}`;
  if (DP[key] !== undefined) {
    console.log(i, bi, current, "3333", DP[key]);
    return DP[key];
  }
  if (i === dots.length) {
    if (bi === blocks.length && current === 0) {
      console.log(i, bi, current, "1111");
      return 1;
    } else if (bi === blocks.length - 1 && blocks[bi] === current) {
      console.log(i, bi, current, "2222");
      return 1;
    } else {
      return 0;
    }
  }
  let ans = 0;
  [".", "#"].forEach((c) => {
    if (dots[i] === c || dots[i] === "?") {
      if (c === "." && current === 0) {
        ans += countPossibilities(dots, blocks, i + 1, bi, 0);
      } else if (
        c === "." &&
        current > 0 &&
        bi < blocks.length &&
        blocks[bi] === current
      ) {
        ans += countPossibilities(dots, blocks, i + 1, bi + 1, 0);
      } else if (c === "#") {
        ans += countPossibilities(dots, blocks, i + 1, bi, current + 1);
      }
    }
  });
  DP[key] = ans;
  return ans;
}

for (const part2 of [false]) {
  let ans = 0;
  for (const line of lines) {
    let [dots, blocks] = line.split(" ");
    if (part2) {
      dots = `${dots}?${dots}?${dots}?${dots}?${dots}`;
      blocks = `${blocks},${blocks},${blocks},${blocks},${blocks}`;
    }
    blocks = blocks.split(",").map(Number);
    DP = {};
    const score = countPossibilities(dots, blocks, 0, 0, 0);
    ans += score;
  }
  console.log(ans);
}
