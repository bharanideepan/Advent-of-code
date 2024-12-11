var fs = require("fs");
var input = '4	1	15	12	0	9	9	5	5	8	7	3	14	5	12	3'.split("\t").map(e => e.trim()).filter(e => e.length).map(Number)
console.log(input)
const s = new Set();
let count = 0;
while (true) {
    count++;
    const max = Math.max(...input);
    const index = input.indexOf(max);
    input[index] = 0;
    for (let i = index + 1, j = 1; j <= max; j++, i++) {
        if (i >= input.length) {
            i = i - input.length;
        }
        input[i] += 1
    }
    if (s.has(input.join())) {
        break;
    }
    s.add(input.join());
}
console.log(count)
