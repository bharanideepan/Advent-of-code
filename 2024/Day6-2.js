var fs = require("fs");
var input = fs.readFileSync("Day6.txt", "utf8");
let startX = 0
let startY = 0
let currentX = 0
let currentY = 0
const parse = () => input.split('\n').filter(e => e.trim().length !== 0).map((line, x) => {
    const split = line.split('').map(e => e.trim());
    const y = split.indexOf("^");
    if (y != -1) {
        startX = x;
        startY = y;
        currentX = x;
        currentY = y;
    }
    return split
})
let array2D = parse();
const printArray = (array) => {
    array.forEach(element => {
        console.log(element.join(" "))
    });
    console.log("\n")
}
const move = (array, x, y) => {
    if (array[x][y] == "^") {
        const nextX = array[x - 1]
        if (nextX) {
            const nextY = nextX[y];
            if (!nextY) {
                array[x][y] = 'x'
                return false;
            }
            if (nextY == '#') {
                currentX = x
                if (array[x][y + 1] == '#') {
                    array[x][y] = 'v'
                    currentY = y
                } else {
                    array[x][y + 1] = '>'
                    array[x][y] = 'x'
                    currentY = y + 1
                }
            } else {
                array[x][y] = 'x'
                nextX[y] = '^'
                currentX = x - 1
                currentY = y
            }
            return true
        } else {
            array[x][y] = 'x'
            return false;
        }
    } else if (array[x][y] == ">") {
        const nextX = array[x]
        if (nextX) {
            const nextY = nextX[y + 1];
            if (!nextY) {
                array[x][y] = 'x'
                return false;
            }
            if (nextY == '#') {
                currentY = y
                if (array[x + 1][y] == '#') {
                    array[x][y] = '<'
                    currentX = x
                } else {
                    array[x][y] = 'x'
                    array[x + 1][y] = 'v'
                    currentX = x + 1
                }
            } else {
                array[x][y] = 'x'
                nextX[y + 1] = '>'
                currentX = x
                currentY = y + 1
            }
            return true
        } else {
            array[x][y] = 'x'
            return false;
        }
    } else if (array[x][y] == "v") {
        const nextX = array[x + 1]
        if (nextX) {
            const nextY = nextX[y];
            if (!nextY) {
                array[x][y] = 'x'
                return false;
            }
            if (nextY == '#') {
                currentX = x
                if (array[x][y - 1] == '#') {
                    array[x][y] = '^'
                    currentY = y
                } else {
                    array[x][y] = 'x'
                    array[x][y - 1] = '<'
                    currentY = y - 1
                }
            } else {
                array[x][y] = 'x'
                nextX[y] = 'v'
                currentX = x + 1
                currentY = y
            }
            return true
        } else {
            array[x][y] = 'x'
            return false;
        }
    } else if (array[x][y] == "<") {
        const nextX = array[x]
        if (nextX) {
            const nextY = nextX[y - 1];
            if (!nextY) {
                array[x][y] = 'x'
                return false;
            }
            if (nextY == '#') {
                currentY = y
                if (array[x - 1][y] == '#') {
                    array[x][y] = '^'
                    currentX = x
                } else {
                    array[x][y] = 'x'
                    array[x - 1][y] = '^'
                    currentX = x - 1
                }
            } else {
                array[x][y] = 'x'
                nextX[y - 1] = '<'
                currentX = x
                currentY = y - 1
            }
            return true
        } else {
            array[x][y] = 'x'
            return false;
        }
    }
}
while (true) {
    const moved = move(array2D, currentX, currentY)
    if (!moved) {
        break
    }
}
const visited = new Set();
const countX = (array) => {
    let temp = 0
    array.map((row, x) => {
        row.map((element, y) => {
            if (element == 'x') {
                visited.add(`${x},${y}`)
                temp++
            }
        })
    });
    console.log("Part 1 => ", temp)
}
countX(array2D)
array2D = parse();
let count = 0
Array.from(visited).map((value) => {
    const [x, y] = value.split(",")
    if (x != currentX || y != currentY) {
        const newArray = array2D.map(row => row.map(ele => ele))
        newArray[x][y] = '#'
        const hashSet = new Set();
        while (true) {
            if (!move(newArray, currentX, currentY)) {
                break
            }
            const hash = `${newArray[currentX][currentY]},${currentX},${currentY}`
            if (hashSet.has(hash)) {
                count++
                break
            } else {
                hashSet.add(hash)
            }
        }
        currentX = startX;
        currentY = startY;
    }
})
console.log("Part 2 => ", count)