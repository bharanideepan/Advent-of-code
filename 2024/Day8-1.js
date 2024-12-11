var fs = require("fs");
var input = fs.readFileSync("Day8.txt", "utf8").split("\n").map((line) => {
    return line.split("").filter(node => node.trim().length >= 1).map((node) => ({
        antinodes: [],
        node
    }))
})
for (let i = 0; i < input.length; i++) {
    const line = input[i];
    for (let j = 0; j < line.length; j++) {
        const node = line[j];
        if (node.node !== '.') {
            for (let a = i; a < input.length; a++) {
                const line2 = input[a];
                for (let b = 0; b < line2.length; b++) {
                    const node2 = line2[b];
                    if (node.node == node2.node && node != node2) {
                        const xDiff = Math.abs(a - i);
                        const yDiff = Math.abs(b - j);
                        let newX1 = i - xDiff;
                        let newX2 = a + xDiff;
                        let newY1 = j - yDiff;
                        let newY2 = b + yDiff;
                        if (j > b) {
                            newY1 = j + yDiff;
                            newY2 = b - yDiff;
                        }
                        if (input[newX1] && input[newX1][newY1]) {
                            input[newX1][newY1].antinodes.push("#")
                        }
                        if (input[newX2] && input[newX2][newY2]) {
                            input[newX2][newY2].antinodes.push("#")
                        }
                    }
                }
            }
        }
    }

}
console.log(input.reduce((acc, value) => {
    acc += value.filter((node) => node.antinodes.length).length
    return acc;
}, 0))