var fs = require("fs");
var input = fs.readFileSync("Day23.txt", "utf8").split("\n").map(e => e.trim())
const run = (obj) => {
    for (let index = 0; index < input.length;) {
        const element = input[index];
        const [s1, s2, s3] = element.split(" ").map(e => e.trim());
        switch (s1) {
            case 'hlf':
                obj[s2] = obj[s2] / 2
                index++
                break;
            case 'tpl':
                obj[s2] = obj[s2] * 3
                index++
                break;
            case 'inc':
                obj[s2] = obj[s2] + 1
                index++
                break;
            case 'jmp':
                index = (index + Number(s2))
                break;
            case 'jie':
                if (obj[s2[0]] % 2 == 0) {
                    index = (index + Number(s3))
                } else {
                    index++
                }
                break;
            case 'jio':
                if (obj[s2[0]] == 1) {
                    index = (index + Number(s3))
                } else {
                    index++
                }
                break;
        }
    }
    console.log(obj)
}
run({ a: 0, b: 0 })
run({ a: 1, b: 0 })