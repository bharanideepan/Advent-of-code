var fs = require("fs");
var input = fs.readFileSync("Day11.txt", "utf8").split("\n").map(e => {
    return e.trim().split("").map(Number)
})
// console.log(input);
let flashes = 0;
let index = 0;
while (true) {
    input = input.map((row) => {
        return row.map((item) => {
            return ++item
        })
    })
    while (input.some((row) => row.filter(e => e >= 10).length > 0)) {
        input.map((row, i) => {
            return row.map((item, j) => {
                if (item >= 10) {
                    flashes++
                    const prevRow = input[i - 1]
                    const currentRow = input[i]
                    const nextRow = input[i + 1]
                    if (prevRow) {
                        if (prevRow[j - 1]) {
                            prevRow[j - 1] = prevRow[j - 1] + 1
                        }
                        if (prevRow[j]) {
                            prevRow[j] = prevRow[j] + 1
                        }
                        if (prevRow[j + 1]) {
                            prevRow[j + 1] = prevRow[j + 1] + 1
                        }
                    }
                    if (currentRow) {
                        if (currentRow[j - 1]) {
                            currentRow[j - 1] = currentRow[j - 1] + 1
                        }
                        if (currentRow[j]) {
                            currentRow[j] = 0
                        }
                        if (currentRow[j + 1]) {
                            currentRow[j + 1] = currentRow[j + 1] + 1
                        }
                    }
                    if (nextRow) {
                        if (nextRow[j - 1]) {
                            nextRow[j - 1] = nextRow[j - 1] + 1
                        }
                        if (nextRow[j]) {
                            nextRow[j] = nextRow[j] + 1
                        }
                        if (nextRow[j + 1]) {
                            nextRow[j + 1] = nextRow[j + 1] + 1
                        }
                    }
                }
            })
        })
    }
    if (input.every(row => row.every(item => item == 0))) {
        input.map(row => console.log(row.join("")))
        console.log(index + 1)
        break;
    }
    index++
}