let D = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

const lines = D.split("\n");

function isValid(dots, conditions) {
  let current = 0;
  const seen = [];
  for (const dot of dots) {
    if (dot === ".") {
      if (current > 0) {
        seen.push(current);
      }
      current = 0;
    } else if (dot === "#") {
      current += 1;
    }
  }
  if (current > 0) {
    seen.push(current);
  }
  return JSON.stringify(seen) === JSON.stringify(conditions);
}
function generatePossibilities(inputString, conditions) {
  let arrangements = 0;

  function generateCombinations(currentString, index) {
    console.log(currentString);
    if (index === currentString.length) {
      arrangements += isValid(currentString, conditions) ? 1 : 0;
      return;
    }

    if (currentString[index] === "?") {
      generateCombinations(
        currentString.substring(0, index) +
          "#" +
          currentString.substring(index + 1),
        index + 1
      );
      generateCombinations(
        currentString.substring(0, index) +
          "." +
          currentString.substring(index + 1),
        index + 1
      );
    } else {
      generateCombinations(currentString, index + 1);
    }
  }
  generateCombinations(inputString, 0);

  return arrangements;
}

let ans = 0;
for (const line of lines) {
  let [dots, conditions] = line.split(" ");
  dots = `${dots}?${dots}?${dots}?${dots}?${dots}`;
  conditions = `${conditions},${conditions},${conditions},${conditions},${conditions}`;
  console.log(dots, conditions);
  conditions = conditions.split(",").map(Number);
  const possibilities = generatePossibilities(dots, conditions);
  ans += possibilities;
  console.log(ans);
}
console.log(ans);
