var fs = require("fs");
var input = fs.readFileSync("Day4.txt", "utf8");
var horizantal = input.split("\n")
var count = 0;
horizantal.map((line) => {
    regex = /XMAS|SAMX/g;
    line = line.replaceAll('S', 'SS')
    line = line.replaceAll('X', 'XX')
    line.replace(regex, (match) => {
        count++;
    });
})
const array2D = input.split('\n').map(line => line.split(''));
const transposed = array2D[0].map((_, colIndex) => array2D.map(row => row[colIndex]));
transposed.map((line) => {
    line = line.join("");
    regex = /XMAS|SAMX/g;
    line = line.replaceAll('S', 'SS')
    line = line.replaceAll('X', 'XX')
    line.replace(regex, (match) => {
        count++;
    });
})
for (let i = 0; i <= array2D.length - 4; i++) {
    const line = array2D[i];
    for (let j = 0; j <= line.length - 4; j++) {
        const [x, m, a, s] = [array2D[i][j], array2D[i + 1][j + 1], array2D[i + 2][j + 2], array2D[i + 3][j + 3]]
        const value = `${x}${m}${a}${s}`
        if (value == 'XMAS' || value == 'SAMX') {
            count++;
        }
    }
}
for (let i = array2D.length - 1; i >= 3; i--) {
    const line = array2D[i];
    for (let j = 0; j <= line.length - 4; j++) {
        const [x, m, a, s] = [array2D[i][j], array2D[i - 1][j + 1], array2D[i - 2][j + 2], array2D[i - 3][j + 3]]
        const value = `${x}${m}${a}${s}`
        if (value == 'XMAS' || value == 'SAMX') {
            count++;
        }
    }
}
console.log(count)