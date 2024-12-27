let A = 117440;
let B = 0;
let C = 0;

let program = '2,4,1,2,7,5,4,3,0,3,1,7,5,5,3,0'.split(",").map(Number)

const getOperand = (opCode, operand) => {
    const getComboOperand = () => {
        if (operand == 4) return A;
        if (operand == 5) return B;
        if (operand == 6) return C;
        return operand;
    }
    if (opCode == 0 || opCode == 2 || opCode == 5 || opCode == 6 || opCode == 7) {
        return getComboOperand();
    }
    if (opCode == 1 || opCode == 3 || opCode == 4) {
        return operand;
    }

}
let output = []
count = 0;
while (program.join("") != output.join("")) {
    output = [];
    A = ++count
    B = 0
    C = 0
    console.log(A)
    for (let i = 0; i < program.length - 1; i = i + 2) {
        const opCode = program[i];
        let operand = getOperand(opCode, program[i + 1]);
        if (opCode == 0) {
            A = Math.floor(A / Math.pow(2, operand))
        } if (opCode == 1) {
            B = B ^ operand;
        } if (opCode == 2) {
            B = operand % 8;
        } if (opCode == 3) {
            if (A == 0) {
            }
            if (A !== 0) {
                i = operand - 2
            }
        } if (opCode == 4) {
            B = B ^ C;
        } if (opCode == 5) {
            output.push(operand % 8)
        } if (opCode == 6) {
            B = Math.floor(A / Math.pow(2, operand))
        } if (opCode == 7) {
            C = Math.floor(A / Math.pow(2, operand))
        }
    }
}
console.log(A, B, C, output.join(","));