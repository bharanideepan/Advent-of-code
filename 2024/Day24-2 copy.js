var fs = require("fs");
let flag = false;
let data = [[], []];
fs.readFileSync("Day24.txt", "utf8").split("\n").map(e => {
    e = e.trim();
    if (e.length == 0) {
        flag = true;
    } else {
        if (flag) {
            data[1].push(e)
        } else {
            data[0].push(e)
        }
    }
})
function find(a, b, operator) {
    return data[1].find(gate => {
        return gate.startsWith(`${a} ${operator} ${b}`) || gate.startsWith(`${b} ${operator} ${a}`)
    })?.split(' -> ').pop()
}
let swapped = []
function swap() {
    let c0 = null
    for (let i = 0; i < 45; i++) {
        let n = i.toString().padStart(2, 0)
        let m1, n1, r1, z1, c1
        m1 = find(`x${n}`, `y${n}`, 'XOR')
        n1 = find(`x${n}`, `y${n}`, 'AND')
        if (c0) {
            r1 = find(c0, m1, 'AND')
            if (!r1) {
                ([n1, m1] = [m1, n1])
                swapped.push(m1, n1)
                r1 = find(c0, m1, 'AND')
            }
            z1 = find(c0, m1, 'XOR')
            if (m1?.startsWith('z')) {
                ([m1, z1] = [z1, m1])
                swapped.push(m1, z1)
            }
            if (n1?.startsWith('z')) {
                ([n1, z1] = [z1, n1])
                swapped.push(n1, z1)
            }
            if (r1?.startsWith('z')) {
                ([r1, z1] = [z1, r1])
                swapped.push(r1, z1)
            }
            c1 = find(r1, n1, 'OR')
        }
        if (c1?.startsWith('z') && c1 !== 'z45') {
            ([c1, z1] = [z1, c1])
            swapped.push(c1, z1)
        }
        if (c0) {
            console.log("bb")
            c0 = c1
        } else {
            console.log("aa")
            c0 = n1
        }
    }
    console.log(swapped)
}

swap()
console.log('Part 2', swapped.sort().join(','))
