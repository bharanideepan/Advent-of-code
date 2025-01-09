const crypto = require('crypto');
const run = (leading, input = 'cxdnnyjw', temp = 0) => {
    let result = Array(8).fill(undefined)
    while (result.some(e => e == undefined)) {
        const hash = crypto.createHash('md5').update(`${input}${++temp}`).digest('hex')
        if (hash.startsWith(leading) && !isNaN(hash[5]) && hash[5] < 8 && hash[5] >= 0 && result[hash[5]] == undefined) {
            result[hash[5]] = hash[6]
            console.log(result.join(""))
        }
    }
    return result.join("")
}
console.log(run('00000'))  //part2