var fs = require("fs");
var input = fs.readFileSync("Day4.txt", "utf8");
let count = 0;
const array2D = input.split('\n').map(line => line.split(''));
const transposed = array2D[0].map((_, colIndex) => array2D.map(row => row[colIndex]));
const getCount = (line) => {
    let temp = 0;
    line = line.join("")
    regex = /XMAS|SAMX/g;
    line = line.replaceAll('S', 'SS')
    line = line.replaceAll('X', 'XX')
    line.replace(regex, (_) => {
        temp++;
    });
    return temp;
}
[...array2D, ...transposed].map((line) => {
    count += getCount(line);
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
console.log('part1 = ', count)
count = 0;
for (let i = 1; i < array2D.length - 1; i++) {
    const line = array2D[i];
    for (let j = 0; j < line.length - 1; j++) {
        const [center, topLeft, bottomRight, bottomLeft, topRight] = [array2D[i][j], array2D[i - 1][j - 1], array2D[i + 1][j + 1], array2D[i + 1][j - 1], array2D[i - 1][j + 1]]
        const value1 = `${topLeft}${center}${bottomRight}`;
        const value2 = `${bottomLeft}${center}${topRight}`;
        if (value1 == 'MAS' && value2 == 'MAS' || value1 == 'SAM' && value2 == 'SAM' || value1 == 'MAS' && value2 == 'SAM' || value1 == 'SAM' && value2 == 'MAS') {
            count++;
        }
    }
}

console.log('part2 = ', count)