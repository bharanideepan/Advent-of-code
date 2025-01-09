const crypto = require('crypto');
const run = (leading, input = 'cxdnnyjw', temp = 0) => {
    return Array(8).fill(0).reduce((acc, val) => {
        while (true) {
            const hash = crypto.createHash('md5').update(`${input}${++temp}`).digest('hex')
            if (hash.startsWith(leading)) {
                acc += hash[5]
                break
            }
        }
        return acc;
    }, "")
}
console.log(run('00000'))  //part1