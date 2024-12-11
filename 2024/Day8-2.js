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
                    if (node.node == node2.node && i != a && j != b) {
                        const xDiff = Math.abs(a - i);
                        const yDiff = Math.abs(b - j);
                        let flag1 = true;
                        let flag2 = true;
                        let newX1 = i;
                        let newX2 = a;
                        let newY1 = j;
                        let newY2 = b;
                        while (flag1 || flag2) {
                            let temp1 = newY1
                            let temp2 = newY2
                            newX1 = newX1 - xDiff;
                            newX2 = newX2 + xDiff;
                            newY1 = temp1 - yDiff;
                            newY2 = temp2 + yDiff;
                            if (j > b) {
                                newY1 = temp1 + yDiff;
                                newY2 = temp2 - yDiff;
                            }
                            if (input[newX1] && input[newX1][newY1]) {
                                input[newX1][newY1].antinodes.push("#")
                            } else {
                                flag1 = false
                            }
                            if (input[newX2] && input[newX2][newY2]) {
                                input[newX2][newY2].antinodes.push("#")
                            } else {
                                flag2 = false
                            }
                        }
                        node.antinodes.push("#")
                        node2.antinodes.push("#")
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