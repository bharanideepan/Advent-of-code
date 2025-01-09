var fs = require("fs");
let obj = {}
let set = new Set();
let input = fs.readFileSync("Day9.txt", "utf8").split("\n").map(e => {
    let [a, distance] = e.trim().split("=").map(e1 => e1.trim())
    distance = Number(distance)
    const [x, y] = a.split("to").map(e1 => e1.trim())
    obj[`${x},${y}`] = distance
    obj[`${y},${x}`] = distance
    set.add(x)
    set.add(y)
})
set = Array.from(set)
const getPermutations = (arr) => {
    if (arr.length === 1) return [arr];
    let permutations = [];
    for (let i = 0; i < arr.length; i++) {
        let current = arr[i];
        let remaining = arr.slice(0, i).concat(arr.slice(i + 1));
        let remainingPermutations = getPermutations(remaining);
        for (let perm of remainingPermutations) {
            permutations.push([current, ...perm]);
        }
    }
    return permutations;
}
let permutations = getPermutations(set);
const result = permutations.reduce((acc, val) => {
    const totalDist = val.reduce((acc1, val1, ind, arr) => (ind == arr.length - 1) ? acc1 : acc1 + obj[`${val1},${arr[ind + 1]}`], 0)
    acc[0] = (acc[0] != 0 && acc[0] < totalDist) ? acc[0] : totalDist
    acc[1] = (acc[1] > totalDist) ? acc[1] : totalDist
    return acc;
}, [])
console.log(result)