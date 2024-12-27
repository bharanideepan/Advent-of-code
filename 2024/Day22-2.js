var fs = require("fs");
var input = fs.readFileSync("Day22.txt", "utf8").split("\n").map(BigInt)
const total = new Map();
input.forEach(initial => {
    const seqs = new Map();
    let seq = [0, 0, 0, 0].map(BigInt);
    let n = initial;
    for (let i = 0; i < 2000; i++) {
        const prev = n % 10n;
        const x1 = n * 64n;
        const y1 = x1 ^ n;
        const z1 = y1 % 16777216n;
        const x2 = z1 / 32n;
        const y2 = x2 ^ z1;
        const z2 = y2 % 16777216n;
        const x3 = z2 * 2048n;
        const y3 = x3 ^ z2;
        const z3 = y3 % 16777216n;
        seq = [...seq.slice(1), (z3 % 10n) - prev];
        if (i >= 3) {
            const key = seq.join(',');
            if (!seqs.has(key)) {
                seqs.set(key, z3 % 10n);
            }
        }
        n = z3;
    }
    seqs.forEach((value, key) => {
        total.set(key, (total.get(key) || 0n) + value);
    });
});
let result = -Infinity;
total.forEach((value, key) => {
    if (value > result) {
        result = value
    }
});
console.log(result);
