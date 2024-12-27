var fs = require("fs");
const input = fs.readFileSync("Day23.txt", "utf8").split("\n").map(line => line.trim().split('-'))
// I returned to my original plan, this time with better result, because I made a connection map before.
// So: for each computer I checked if it is connected to all other computers in each group.
// If not, I created a new group for it. Now when I think about it, I wonder how it worked at all...
function getResult() {
    const connections = new Set();
    let computers = new Set();
    for (const [c1, c2] of input) {
        connections.add(`${c1},${c2}`);
        connections.add(`${c2},${c1}`);
        computers.add(c1);
        computers.add(c2);
    }
    const groups = [];
    computers = Array.from(computers);
    for (const c of computers) {
        let flag = false;
        for (const group of groups) {
            if (Array.from(group).every(cg => connections.has(`${c},${cg}`))) {
                group.add(c);
                flag = true;
                break;
            }
        }
        if (!flag) {
            const newGroup = new Set();
            newGroup.add(c);
            groups.push(newGroup);
        }
    }
    console.log(groups)
    let largestGroup = groups.pop();
    for (const g of groups) {
        if (g.size > largestGroup.size) {
            largestGroup = g;
        }
    }
    return Array.from(largestGroup).sort().join(',');
}

console.log(getResult());
