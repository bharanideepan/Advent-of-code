var fs = require("fs");
var input = fs.readFileSync("Day7.txt", "utf8").split("\n").map((line) => {
    const [value, y] = line.split(":").map(e => e.trim());
    const numbers = y.split(" ").map(Number)
    return {
        result: Number(value), numbers
    }
})
const generateOperatorCombinations = (length) => {
    const operators = ["+", "*"];
    let combinations = [[]];
    for (let i = 0; i < length; i++) {
        let newCombinations = [];
        for (let comb of combinations) {
            for (let op of operators) {
                newCombinations.push([...comb, op]);
            }
        }
        combinations = newCombinations;
    }
    return combinations;
};

// const generateOperatorCombinations = (length) => {
//     const operators = ["+", "*"];
//     if (length === 0) {
//         return [[]];
//     }
//     const combinations = [];
//     for (const op of operators) {
//         const tempCombinations = generateOperatorCombinations(length - 1);
//         for (const comb of tempCombinations) {
//             combinations.push([op, ...comb]);
//         }
//     }
//     return combinations;
// };

const calculateResult = (numbers, operators) => {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "+") {
            result += numbers[i + 1];
        } else if (operators[i] === "*") {
            result *= numbers[i + 1];
        }
    }
    return result;
}

const getAllResults = (numbers) => {
    const operatorCombinations = generateOperatorCombinations(numbers.length - 1);
    const results = [];
    for (const operators of operatorCombinations) {
        const result = calculateResult(numbers, operators);
        results.push({ operators, result });
    }
    return results;
}
let sum = 0
input.map((item) => {
    const { result, numbers } = item;
    const results = getAllResults(numbers)
    const x = results.find(re => re.result == result)
    if (x) {
        sum += result
    }
})
console.log(sum)
