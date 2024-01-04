let x = `Time:      71530
Distance:  940200`;
let y = `Time:        46828479
Distance:   347152214061471`;
let input = y.split("\n").map((e) =>
  e
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((f) => f != "")
);
let result = 1;
for (let i = 0; i < input[0].length; i++) {
  let [time, count, press] = [input[0][i], 0, 0];
  while (++press < time) {
    if ((time - press) * press > input[1][i]) count++;
  }
  result *= count;
}
console.log(result);
