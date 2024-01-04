let x = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;
let count = 0;
let input = x.split("\n").map((line) =>
  line
    .trim()
    .split("")
    .map((char) => (char === "O" ? char : char))
);

function printInput(input, timeout) {
  setTimeout(() => {
    printInput2(input);
    var table = document.querySelector("table");
    if (!table) {
      table = document.createElement("table");
      document.body.appendChild(table);
    }
    table.innerHTML = "";
    for (var i = 0; i < input.length; i++) {
      var row = document.createElement("tr");
      for (var j = 0; j < input[i].length; j++) {
        var cell = document.createElement("td");
        cell.textContent = input[i][j];
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
  }, timeout);
}
const printInput2 = (input) => {
  for (let index = 0; index < input.length; index++) {
    const element = input[index];
    console.log(element.join(""));
  }
  console.log("\n\n");
};
const tiltNorth = () => {
  for (let index = 0; index < input.length; index++) {
    const row = input[index];
    for (let index2 = 0; index2 < row.length; index2++) {
      const item = row[index2];
      if (item !== "." && item !== "#") {
        for (let a = index - 1; a >= 0; a--) {
          const prev = input[a][index2];
          if (prev === ".") {
            input[a][index2] = item;
            input[a + 1][index2] = prev;
          } else {
            break;
          }
        }
      }
    }
  }
};
printInput(JSON.parse(JSON.stringify(input)), 2000);
tiltNorth();
printInput(JSON.parse(JSON.stringify(input)), 4000);
let result = 0;
for (
  let index = 0, score = input.length;
  index < input.length;
  index++, score--
) {
  const row = input[index];
  result += score * row.filter((char) => char === "O").length;
}
console.log(result);
