const fs = require('fs')
var input = fs.readFileSync("Day12.txt", "utf8")
console.log(input.match(/-?\d+/g).reduce((acc, val) => acc + Number(val), 0))
function sumIgnoringRed(data) {
    function containsRed(obj) {
        return Object.values(obj).includes("red");
    }
    function calculateSum(item) {
        if (typeof item === "number") {
            return item;
        } else if (Array.isArray(item)) {
            return item.reduce((sum, el) => sum + calculateSum(el), 0);
        } else if (item !== null && typeof item === "object") {
            if (containsRed(item)) {
                return 0;
            }
            return Object.values(item).reduce((sum, el) => sum + calculateSum(el), 0);
        }
        return 0;
    }
    return calculateSum(data);
}
console.log(sumIgnoringRed(JSON.parse(input)))
