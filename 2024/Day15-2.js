let fs = require("fs");
let pos = [0, 0];
let map = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########`.split('\n').map((e, x) => e.trim().split('').map((item, y) => {
    if (item.trim() == '@') {
        pos[0] = x;
        pos[1] = y;
    }
    return item.trim();
}))

let moves = `<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`.replaceAll('\n', '').split('')
map = map.map((row) => {
    const newRow = row.map((item) => {
        if (item == '@') {
            return '@.'
        }
        if (item == 'O') {
            return '[]'
        }
        return `${item}${item}`
    }).join("").split("")
    const robotIndex = newRow.indexOf('@')
    if (robotIndex >= 0) {
        pos[1] = robotIndex
    }
    return newRow
})
map.map(row => {
    console.log(row.join(" "))
})
console.log('\n')
moves.map((move, index) => {
    if (move == '<') {
        let temp = [];
        let foundDot = false;
        for (let i = pos[1] - 1; i >= 0; i--) {
            const element = map[pos[0]][i];
            if (element == '#') {
                break;
            }
            if (element == '.') {
                foundDot = true;
                map[pos[0]][i] = '@';
                temp.push(i)
                break;
            }
            temp.push(i)
        }
        if (foundDot) {
            temp.reverse().map((i, index) => {
                map[pos[0]][i] = map[pos[0]][i + 1];
                if (index == temp.length - 1) {
                    pos = [pos[0], temp[temp.length - 1]];
                    map[pos[0]][pos[1]] = '@'
                    map[pos[0]][pos[1] + 1] = '.'
                }
            })
        }
    }
    if (move == '>') {
        let temp = [];
        let foundDot = false;
        for (let i = pos[1] + 1; i < map[0].length; i++) {
            const element = map[pos[0]][i];
            if (element == '#') {
                break;
            }
            if (element == '.') {
                foundDot = true;
                map[pos[0]][i] = '@';
                temp.push(i)
                break;
            }
            temp.push(i)
        }
        if (foundDot) {
            temp.reverse().map((i, index) => {
                map[pos[0]][i] = map[pos[0]][i - 1];
                if (index == temp.length - 1) {
                    pos = [pos[0], temp[temp.length - 1]];
                    map[pos[0]][pos[1]] = '@'
                    map[pos[0]][pos[1] - 1] = '.'
                }
            })
        }
    }
    if (move == '^') {
        let obj = {
            [pos[0]]: [pos[1]]
        }
        let foundDot = false;
        for (let i = pos[0] - 1; i >= 0; i--) {
            const currentRow = map[i]
            const elements = currentRow.filter((_, index) => obj[i + 1].includes(index));
            if (!elements.length || elements.includes("#")) {
                foundDot = false;
                break;
            }
            if (elements.length && elements.every((element) => element == '.')) {
                foundDot = true;
                break;
            }
            obj[i] = [];
            for (let j = 0; j < obj[i + 1].length; j++) {
                const columnIndex = obj[i + 1][j];
                const item = currentRow[columnIndex];
                if (item == '[') {
                    obj[i].push(columnIndex)
                    obj[i].push(columnIndex + 1)
                }
                if (item == ']') {
                    obj[i].push(columnIndex)
                    obj[i].push(columnIndex - 1)
                }
            }
        }
        if (foundDot) {
            Object.keys(obj).map((key) => {
                let currRowIndex = Number(key) - 1;
                let columnIndices = Array.from(new Set([...obj[key]]));
                columnIndices.map((i) => {
                    [map[currRowIndex][i], map[Number(key)][i]] = [map[Number(key)][i], map[currRowIndex][i]]
                })
            })
            pos = [pos[0] - 1, pos[1]]
            map[pos[0]][pos[1]] = '@'
        }
    }
    if (move == 'v') {
        let obj = {
            [pos[0]]: [pos[1]]
        }
        let foundDot = false;
        for (let i = pos[0] + 1; i < map.length; i++) {
            const currentRow = map[i]
            const elements = currentRow.filter((_, index) => obj[i - 1].includes(index));
            if (!elements.length || elements.includes("#")) {
                foundDot = false;
                break;
            }
            if (elements.length && elements.every((element) => element == '.')) {
                foundDot = true;
                break;
            }
            obj[i] = [];
            for (let j = 0; j < obj[i - 1].length; j++) {
                const columnIndex = obj[i - 1][j];
                const item = currentRow[columnIndex];
                if (item == '[') {
                    obj[i].push(columnIndex)
                    obj[i].push(columnIndex + 1)
                }
                if (item == ']') {
                    obj[i].push(columnIndex)
                    obj[i].push(columnIndex - 1)
                }
            }
        }
        if (foundDot) {
            Object.keys(obj).reverse().map((key) => {
                let currRowIndex = Number(key) + 1;
                let columnIndices = Array.from(new Set([...obj[key]]));
                columnIndices.map((i) => {
                    [map[currRowIndex][i], map[Number(key)][i]] = [map[Number(key)][i], map[currRowIndex][i]]
                })
            })
            pos = [pos[0] + 1, pos[1]]
            map[pos[0]][pos[1]] = '@'
        }
    }
    if (index >= 188 && index <= 199) {
        console.log('Move = ', move, index + 1)
        map.map(row => {
            console.log(row.join(" "))
        })
        console.log('\n')
    }
})
// map.map(row => {
//     console.log(row.join(" "))
// })
// console.log('\n')
let result = 0;
map.map((row, i) => {
    row.map((item, j) => {
        if (item == '[') {
            result += ((i * 100) + j)
        }
    })
})
console.log(result)