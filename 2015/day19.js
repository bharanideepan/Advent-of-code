var fs = require("fs");
var input = fs.readFileSync("Day19.txt", "utf8").split("\n").map(e => e.trim()).filter(e => e.length)
const molecule = `#${input.pop()}#`;
const set = new Set();
input.forEach((item) => {
    const [x, y] = item.split("=>").map(e => e.trim());
    const split = molecule.split(x);
    for (let index = 0; index < split.length - 1; index++) {
        let newMolecule = '';
        for (let j = 0; j < split.length - 1; j++) {
            newMolecule += `${split[j]}${index == j ? y : x}${j == split.length - 2 ? split[j + 1] : ''}`
        }
        set.add(newMolecule.replaceAll("#", ''));
    }
})
console.log(set.size)