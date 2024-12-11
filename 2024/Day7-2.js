var fs = require("fs");
var input = fs.readFileSync("Day7.txt", "utf8").split("\n").map((line) => {
    const [value, y] = line.split(":").map(e => e.trim());
    const numbers = y.split(" ").map(Number)
    return {
        result: Number(value), numbers
    }
})

const generateOperatorCombinations = (length) => {
    const operators = ["+", "*", "||"];
    if (length === 0) return [[]];
    return operators.flatMap(op =>
        generateOperatorCombinations(length - 1).map(comb => [op, ...comb])
    );
};

const calculateResult = (numbers, operators) => {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "+") {
            result += numbers[i + 1];
        } else if (operators[i] === "*") {
            result *= numbers[i + 1];
        } else if (operators[i] === "||") {
            result = Number(`${result}${numbers[i + 1]}`);
        }
    }
    return result;
}
let a = new Date()
const isValid = (numbers, result) => {
    const operatorCombinations = generateOperatorCombinations(numbers.length - 1);
    console.log((new Date()) - a)
    let valid = false;
    for (const operators of operatorCombinations) {
        const result1 = calculateResult(numbers, operators);
        if (result == result1) {
            valid = true;
            break;
        }
    }
    return valid;
}
let sum = 0
input.map((item) => {
    const { result, numbers } = item;
    if (isValid(numbers, result)) {
        sum += result
    }
})
console.log((new Date()) - a)
console.log(sum)
