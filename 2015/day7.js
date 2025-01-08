var fs = require("fs");
const obj = {};
var input = fs.readFileSync("Day7.txt", "utf8").split("\n").map(e => {
    const [l, r] = e.trim().split("->").map(e1 => e1.trim())
    obj[r] = "UNSET"
    return { l, r }
})
const run = (part2 = false) => {
    while (Object.values(obj).filter(e => e == "UNSET").length != 0) {
        for (let index = 0; index < input.length; index++) {
            let { l, r } = input[index];
            if (part2 && r == "b") continue
            if (l.includes("AND")) {
                let [x, y] = l.split("AND").map((z) => z.trim())
                if (isNaN(x)) {
                    if (obj[x] == 'UNSET') {
                        continue;
                    } else {
                        x = obj[x]
                    }
                }
                if (isNaN(y)) {
                    if (obj[y] == 'UNSET') {
                        continue;
                    } else {
                        y = obj[y]
                    }
                }
                obj[r] = Number(x) & Number(y)
            } else if (l.includes("OR")) {
                let [x, y] = l.split("OR").map((z) => z.trim())
                if (isNaN(x)) {
                    if (obj[x] == 'UNSET') {
                        continue;
                    } else {
                        x = obj[x]
                    }
                }
                if (isNaN(y)) {
                    if (obj[y] == 'UNSET') {
                        continue;
                    } else {
                        y = obj[y]
                    }
                }
                obj[r] = Number(x) | Number(y)
            } else if (l.includes("NOT")) {
                let [x, y] = l.split("NOT").map((z) => z.trim())
                if (isNaN(y)) {
                    if (obj[y] == 'UNSET') {
                        continue;
                    } else {
                        y = obj[y]
                    }
                }
                obj[r] = ~Number(y) & 0xFFFF
            } else if (l.includes("LSHIFT")) {
                let [x, y] = l.split("LSHIFT").map((z) => z.trim())

                if (isNaN(x)) {
                    if (obj[x] == 'UNSET') {
                        continue;
                    } else {
                        x = obj[x]
                    }
                }
                if (isNaN(y)) {
                    if (obj[y] == 'UNSET') {
                        continue;
                    } else {
                        y = obj[y]
                    }
                }
                obj[r] = Number(x) << Number(y)
            } else if (l.includes("RSHIFT")) {
                let [x, y] = l.split("RSHIFT").map((z) => z.trim())
                if (isNaN(x)) {
                    if (obj[x] == 'UNSET') {
                        continue;
                    } else {
                        x = obj[x]
                    }
                }
                if (isNaN(y)) {
                    if (obj[y] == 'UNSET') {
                        continue;
                    } else {
                        y = obj[y]
                    }
                }
                obj[r] = Number(x) >> Number(y)
            } else {
                if (isNaN(l)) {
                    if (obj[l] == 'UNSET') {
                        continue;
                    } else {
                        l = obj[l]
                    }
                }
                obj[r] = Number(l)
            }
        }
    }
    return obj["a"]
}
const part1 = run();
Object.keys(obj).map((key) => {
    obj[key] = "UNSET"
    if (key == "b") {
        obj[key] = part1
    }
})
const part2 = run(true);
console.log(part1);
console.log(part2)