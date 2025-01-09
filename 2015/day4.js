const crypto = require('crypto');
const run = (leading, input = 'iwrupvqb', temp = 0) => {
    while (true) {
        if (crypto.createHash('md5').update(`${input}${++temp}`).digest('hex').startsWith(leading)) return temp
    }
}
console.log(run('00000'))  //part1
console.log(run('000000')) //part2