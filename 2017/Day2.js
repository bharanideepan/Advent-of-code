var fs = require("fs");
var input = fs.readFileSync("Day2.txt", "utf8").split("\n").map(row => row.split("\t").filter(x => x != "").map(Number))
let sum = 0;
for (let index = 0; index < input.length; index++) {
    const row = input[index];
    const max = Math.max(...row);
    const min = Math.min(...row);
    sum += max - min
}
console.log(sum)

sum = 0;
for (let index = 0; index < input.length; index++) {
    const row = input[index];
    for (let i = 0; i < row.length; i++) {
        const element = row[i];
        for (let j = 0; j < row.length; j++) {
            if (i != j && element > row[j]) {
                const next = row[j];
                if ((element % next) == 0) {
                    sum += element / next
                }
            }
        }
    }
}
console.log(sum)