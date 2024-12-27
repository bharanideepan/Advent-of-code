function getOutput(A) {
    let B = A % BigInt(8);
    B = B ^ BigInt(2);
    B = B ^ (A / (BigInt(2) ** B));
    B = B ^ BigInt(7);
    A = A / (BigInt(2) ** BigInt(3));
    return B % BigInt(8);
}

let possibleValue = [0].map(BigInt);
const sequence = [2, 4, 1, 2, 7, 5, 4, 3, 0, 3, 1, 7, 5, 5, 3, 0].map(BigInt).reverse();

for (const p of sequence) {
    const newPossibleValue = [];
    for (const pp of possibleValue) {
        for (let i = BigInt(0); i < BigInt(8); i++) { //B values (B = A % 8, B value must be from 0 to 7)
            const number = (pp * (BigInt(2) ** BigInt(3))) + i; //Reverse the last step (A / 2**3) + every B value
            const output = getOutput(number);
            if (p === output) {
                newPossibleValue.push(number);
            }
        }
    }
    possibleValue = [...newPossibleValue];
}
console.log(possibleValue.reduce((min, current) => current < min ? current : min));