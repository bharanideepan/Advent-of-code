const generateOperatorCombinations = (arr) => {
    let combinations = [[]];
    for (let i = 0; i < arr.length; i++) {
        let newCombinations = [];
        for (let comb of combinations) {
            for (let op of arr) {
                newCombinations.push([...comb, op]);
            }
        }
        combinations = newCombinations;
    }
    return combinations;
};
console.log(generateOperatorCombinations([20, 15, 10, 5, 5]))