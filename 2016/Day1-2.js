var fs = require("fs");
var input = fs.readFileSync("Day1.txt", "utf8").split(", ");
const AoCd1p2 = (directions) => {
    const nav = {
        n: { L: 'w', R: 'e', plane: 'y', offset: 1 },
        e: { L: 'n', R: 's', plane: 'x', offset: 1 },
        s: { L: 'e', R: 'w', plane: 'y', offset: -1 },
        w: { L: 's', R: 'n', plane: 'x', offset: -1 }
    }, mem = { x0y0: true }

    let key

    return Object.values(
        directions.reduce((state, dir) => {

            if (state.found) return state

            state.dir = nav[state.dir[dir[0]]]

            for (let i = 0, j = +dir.slice(1); i < j && !state.found; i++) {
                state.pos[state.dir.plane] += state.dir.offset
                key = `x${state.pos.x}y${state.pos.y}`

                if (mem[key]) state.found = true
                else mem[key] = true
            }

            return state
        }, { dir: nav.n, pos: { x: 0, y: 0 }, found: false }).pos
    ).reduce((sum, val) => sum + Math.abs(val), 0)
}
console.log(AoCd1p2(input))
let pos = [0, 0];
let prev = "N";
const visited = new Set();
const printResult = (x) => {
    console.log(x)
    const [a, b] = x.split(",").map(Number)
    console.log(Math.abs(a) + Math.abs(b))
}
const add = (x) => {
    visited.add(x);
}
outer: for (let index = 0; index < input.length; index++) {
    const element = input[index];
    const [dir, count] = element.split("");
    const [x, y] = pos;
    if (dir == "R") {
        if (prev == 'N') {
            prev = 'E'
            pos[1] += Number(count)
            for (let i = 1; i <= Number(count); i++) {
                if (visited.has((`${x},${y + i}`))) {
                    printResult(`${x},${y + i}`)
                    break outer;
                }
                add(`${x},${y + i}`)
            }
        }
        else if (prev == 'E') {
            prev = 'S'
            pos[0] += Number(count)
            for (let i = 1; i <= Number(count); i++) {
                if (visited.has((`${x + i},${y}`))) {
                    printResult(`${x + i},${y}`)
                    break outer;
                }
                add(`${x + i},${y}`)
            }
        }
        else if (prev == 'S') {
            prev = 'W'
            pos[1] -= Number(count)
            for (let i = 1; i <= Number(count); i++) {
                if (visited.has((`${x},${y - i}`))) {
                    printResult(`${x},${y - i}`)
                    break outer;
                }
                add(`${x},${y - i}`)
            }
        }
        else if (prev == 'W') {
            prev = 'N'
            pos[0] -= Number(count)
            for (let i = 1; i <= Number(count); i++) {
                if (visited.has((`${x - i},${y}`))) {
                    printResult(`${x - i},${y}`)
                    break outer;
                }
                add(`${x - i},${y}`)
            }
        }
    } else if (dir == "L") {
        if (prev == 'N') {
            prev = 'W'
            pos[1] -= Number(count)
            for (let i = 1; i <= Number(count); i++) {
                if (visited.has((`${x},${y - i}`))) {
                    printResult(`${x},${y - i}`)
                    break outer;
                }
                add(`${x},${y - i}`)
            }
        }
        else if (prev == 'E') {
            prev = 'N'
            pos[0] -= Number(count)
            for (let i = 1; i <= Number(count); i++) {
                if (visited.has((`${x - i},${y}`))) {
                    printResult(`${x - i},${y}`)
                    break outer;
                }
                add(`${x - i},${y}`)
            }
        }
        else if (prev == 'S') {
            prev = 'E'
            pos[1] += Number(count)
            for (let i = 1; i <= Number(count); i++) {
                if (visited.has((`${x},${y + i}`))) {
                    printResult(`${x},${y + i}`)
                    break outer;
                }
                add(`${x},${y + i}`)
            }
        }
        else if (prev == 'W') {
            prev = 'S'
            pos[0] += Number(count)
            for (let i = 1; i <= Number(count); i++) {
                if (visited.has((`${x + i},${y}`))) {
                    printResult(`${x + i},${y}`)
                    break outer;
                }
                add(`${x + i},${y}`)
            }
        }
    }
}
// console.log(pos, visited)
// console.log(Math.abs(pos[0]) + Math.abs(pos[1]))