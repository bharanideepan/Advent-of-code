var fs = require("fs");
var input = fs.readFileSync("Day6.txt", "utf8");
let currentX = 0
let currentY = 0
const array2D = input.split('\n').filter(e => e.trim().length !== 0).map((line, x) => {
    const split = line.split('').map(e => e.trim());
    const y = split.indexOf("^");
    if (y != -1) {
        currentX = x;
        currentY = y;
    }
    return split
});
const printArray = (array) => {
    array.forEach(element => {
        console.log(element.join(" "))
    });
    console.log("\n")
}
const countX = (array) => {
    let temp = 1
    array.map(row => {
        row.map(element => {
            if (element == 'x') {
                temp++
            }
        })
    });
    console.log(temp)
}
printArray(array2D)
const move = (array, x, y) => {
    if (array[x][y] == "^") {
        const nextX = array[x - 1]
        if (nextX) {
            const nextY = nextX[y];
            if (!nextY) return false;
            if (nextY == '#') {
                array[x][y] = 'x'
                array[x][y + 1] = '>'
                currentX = x
                currentY = y + 1
            } else {
                array[x][y] = 'x'
                nextX[y] = '^'
                currentX = x - 1
                currentY = y
            }
            return true
        } else {
            return false;
        }
    } else if (array[x][y] == ">") {
        const nextX = array[x]
        if (nextX) {
            const nextY = nextX[y + 1];
            if (!nextY) return false;
            if (nextY == '#') {
                array[x][y] = 'x'
                array[x + 1][y] = 'v'
                currentX = x + 1
                currentY = y
            } else {
                array[x][y] = 'x'
                nextX[y + 1] = '>'
                currentX = x
                currentY = y + 1
            }
            return true
        } else {
            return false;
        }
    } else if (array[x][y] == "v") {
        const nextX = array[x + 1]
        if (nextX) {
            const nextY = nextX[y];
            if (!nextY) return false;
            if (nextY == '#') {
                array[x][y] = 'x'
                array[x][y - 1] = '<'
                currentX = x
                currentY = y - 1
            } else {
                array[x][y] = 'x'
                nextX[y] = 'v'
                currentX = x + 1
                currentY = y
            }
            return true
        } else {
            return false;
        }
    } else if (array[x][y] == "<") {
        const nextX = array[x]
        if (nextX) {
            const nextY = nextX[y - 1];
            if (!nextY) return false;
            if (nextY == '#') {
                array[x][y] = 'x'
                array[x - 1][y] = '^'
                currentX = x - 1
                currentY = y
            } else {
                array[x][y] = 'x'
                nextX[y - 1] = '<'
                currentX = x
                currentY = y - 1
            }
            return true
        } else {
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
printArray(array2D)
countX(array2D)