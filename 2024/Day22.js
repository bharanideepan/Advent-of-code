var fs = require("fs");
var input = fs.readFileSync("Day22.txt", "utf8").split("\n").map(BigInt)
let result = 0n;
input.map((number) => {
    let count = 0;
    const newSecret = (secret) => {
        if (count == 2000) return secret;
        const x1 = secret * 64n;
        const y1 = x1 ^ secret;
        const z1 = y1 % 16777216n;
        const x2 = z1 / 32n;
        const y2 = x2 ^ z1;
        const z2 = y2 % 16777216n;
        const x3 = z2 * 2048n;
        const y3 = x3 ^ z2;
        const z3 = y3 % 16777216n;
        count++;
        return newSecret(z3)
    }
    const secret = newSecret(number)
    result += secret;
})
console.log(result)