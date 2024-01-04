let inputs = `19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`.split("\n");

function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
  let ua,
    ub,
    denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  if (denom == 0) return null;
  ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
  ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
  return {
    x: x1 + ua * (x2 - x1),
    y: y1 + ua * (y2 - y1),
  };
}

let part1 = 0;
for (let i = 0; i < inputs.length; i++) {
  for (let j = i + 1; j < inputs.length; j++) {
    let [x1, y1, c1, d1, e1, f1] = inputs[i]
      .split(" @ ")
      .map((x) => x.split(", ").map(Number))
      .flat();
    let [x3, y3, c2, d2, e2, f2] = inputs[j]
      .split(" @ ")
      .map((x) => x.split(", ").map(Number))
      .flat();
    let x2 = d1 + x1;
    let x4 = d2 + x3;
    let y2 = e1 + y1;
    let y4 = e2 + y3;
    let intersection = intersect(x1, y1, x2, y2, x3, y3, x4, y4);
    if (intersection) {
      let x = intersection["x"];
      let y = intersection["y"];
      if (
        x > x1 == x2 - x1 > 0 &&
        y > y1 == y2 - y1 > 0 &&
        x > x3 == x4 - x3 > 0 &&
        y > y3 == y4 - y3 > 0 &&
        x >= 200000000000000 &&
        x <= 400000000000000 &&
        y >= 200000000000000 &&
        y <= 400000000000000
      )
        part1++;
    }
  }
}
console.log("Part1: " + part1);
