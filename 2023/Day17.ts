function parseInput(input: string) {
  return new CharGrid(input);
}

function runPart1() {
  const map = parseInput(getDefaultInput());

  type Path = { pos: Position; dir: Direction; dist: number };
  let queue: Path[][] = [
    [{ pos: new Position(0, 0), dir: Direction.right, dist: 0 }],
  ];

  const seen = new Set<string>();
  let heatLoss = 0;

  function checkStep() {
    for (const path of queue[heatLoss] ?? []) {
      if (path.pos.x === map.height - 1 && path.pos.y === map.width - 1) {
        return;
      }
      tryMove(path, path.dir);
      tryMove(path, path.dir.turnLeft());
      tryMove(path, path.dir.turnRight());
    }

    function tryMove(basePath: Path, dir: Direction) {
      const nextPath: Path = {
        pos: basePath.pos.move(dir),
        dir,
        dist: dir === basePath.dir ? basePath.dist + 1 : 1,
      };
      if (nextPath.dist > 3 || !map.contains(nextPath.pos)) return;

      const identifier = [
        nextPath.pos.x,
        nextPath.pos.y,
        nextPath.dir.x,
        nextPath.dir.y,
        nextPath.dist,
      ].join();
      if (seen.has(identifier)) return;

      seen.add(identifier);
      const newHeatLoss = heatLoss + +(map.at(nextPath.pos) ?? "0");
      queue[newHeatLoss] ??= [];
      queue[newHeatLoss].push(nextPath);
    }
    heatLoss++;
    checkStep();
  }
  checkStep();
  console.log(heatLoss);
}

function runPart2() {
  const map = parseInput(getDefaultInput());

  type Path = { pos: Position; dir: Direction; dist: number };
  let queue: Path[][] = [
    [
      { pos: new Position(0, 0), dir: Direction.right, dist: 0 },
      { pos: new Position(0, 0), dir: Direction.down, dist: 0 },
    ],
  ];

  const seen = new Set<string>();
  let heatLoss = 0;

  function checkStep() {
    for (const path of queue[heatLoss] ?? []) {
      if (path.pos.x === map.height - 1 && path.pos.y === map.width - 1) {
        return;
      }
      if (path.dist < 10) {
        tryMove(path, path.dir);
      }
      if (path.dist >= 4) {
        tryMove(path, path.dir.turnLeft());
        tryMove(path, path.dir.turnRight());
      }
    }

    function tryMove(basePath: Path, dir: Direction) {
      const nextPath: Path = {
        pos: basePath.pos.move(dir),
        dir,
        dist: dir === basePath.dir ? basePath.dist + 1 : 1,
      };
      if (!map.contains(nextPath.pos)) return;

      const identifier = [
        nextPath.pos.x,
        nextPath.pos.y,
        nextPath.dir.x,
        nextPath.dir.y,
        nextPath.dist,
      ].join();
      if (seen.has(identifier)) return;

      seen.add(identifier);
      const newHeatLoss = heatLoss + +(map.at(nextPath.pos) ?? "0");
      queue[newHeatLoss] ??= [];
      queue[newHeatLoss].push(nextPath);
    }
    heatLoss++;
    checkStep();
  }
  checkStep();
  console.log(heatLoss);
}

class Direction {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    Object.freeze(this);
  }
  turnLeft() {
    return new Direction(-this.y, this.x);
  }
  turnRight() {
    return new Direction(this.y, -this.x);
  }

  static down = new Direction(1, 0);
  static right = new Direction(0, 1);
}

class Position {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    Object.freeze(this);
  }
  move(dir: Direction) {
    return new Position(this.x + dir.x, this.y + dir.y);
  }
}

class CharGrid {
  private grid: string[][];
  width = 0;
  height = 0;

  constructor(grid: string | undefined) {
    if (!grid) {
      this.grid = [];
      return;
    }
    this.grid = grid
      .replace(/\n\s*$/, "")
      .split(/\n/)
      .map((x) => [...x]);
    this.height = this.grid.length;
    this.width = Math.max(...this.grid.map((x) => x.length));
    console.log(this.grid);
  }

  at(pos: Position): string | undefined {
    return this.grid[pos.x]?.[pos.y];
  }

  contains(pos: Position): boolean {
    return (
      pos.x >= 0 && pos.x < this.height && pos.y >= 0 && pos.y < this.width
    );
  }
}

function getDefaultInput() {
  return `
2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533
`.trim();
}

runPart1();
runPart2();
