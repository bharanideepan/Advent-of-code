var fs = require("fs");
const obj = {};
var input = fs.readFileSync("Day23.txt", "utf8").split("\n").map(e => {
    const [a, b] = e.split("-").map(x => x.trim())
    if (obj[a]) {
        obj[a].push(b)
    } else {
        obj[a] = [b]
    }
    if (obj[b]) {
        obj[b].push(a)
    } else {
        obj[b] = [a]
    }
    return { a, b }
})
const set = new Set();
Object.keys(obj).map((key) => {
    const connections = obj[key];
    for (let i = 0; i < connections.length; i++) {
        const c = connections[i];
        if (obj[c].includes(key)) {
            const remaining = connections.filter((e, index) => index !== i)
            for (let j = 0; j < remaining.length; j++) {
                const c2 = remaining[j];
                if (obj[c].includes(c2) && obj[c2].includes(key) && obj[c2].includes(c)) {
                    if (key.startsWith("t") || c.startsWith("t") || c2.startsWith("t")) {
                        let temp = [key, c, c2].sort().join()
                        set.add(temp);
                    }
                }
            }
        }
    }
})
console.log(set.size)
