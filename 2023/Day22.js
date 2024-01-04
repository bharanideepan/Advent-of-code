let input = `1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`;

const isSolid = (bset, x, y, z) => {
  if (z === 0) {
    return true;
  }
  return bset.has(`${x},${y},${z}`);
};

const fall = (bricks) => {
  let fell = false;
  const bset = new Set();
  for (const [sx, sy, sz, ex, ey, ez] of bricks) {
    for (let x = sx; x <= ex; x++) {
      for (let y = sy; y <= ey; y++) {
        bset.add(`${x},${y},${ez}`);
      }
    }
  }
  const newBricks = new Array();
  for (const b of bricks) {
    let supp = false;
    const [sx, sy, sz, ex, ey, ez] = b;
    for (let x = sx; x <= ex; x++) {
      for (let y = sy; y <= ey; y++) {
        if (isSolid(bset, x, y, sz - 1)) {
          supp = true;
          break;
        }
      }
      if (supp) {
        break;
      }
    }
    if (!supp) {
      fell = true;
      newBricks.push([sx, sy, sz - 1, ex, ey, ez - 1]);
    } else {
      newBricks.push(b);
    }
  }
  return [fell, newBricks];
};

let bricks = input.split("\n").map((l) => {
  const [sloc, eloc] = l.split("~");
  const [sx, sy, sz] = sloc.split(",").map(Number);
  const [ex, ey, ez] = eloc.split(",").map(Number);
  return [sx, sy, sz, ex, ey, ez];
});

let fell = true;
while (fell) {
  [fell, bricks] = fall(bricks);
}

let part1 = 0;

for (let i = 0; i < bricks.length; i++) {
  const removedOne = bricks.filter((_, j) => i !== j);
  if (!fall(removedOne)[0]) {
    part1 += 1;
  }
}

console.log(part1);

let part2 = 0;

for (let i = 0; i < bricks.length; i++) {
  let removedOne = bricks.filter((_, j) => i !== j);
  const copy = [...removedOne];
  let fell = true;
  while (fell) {
    [fell, removedOne] = fall(removedOne);
  }
  for (let j = 0; j < removedOne.length; j++) {
    if (removedOne[j].join(",") !== copy[j].join(",")) {
      part2 += 1;
    }
  }
}

console.log(part2);
