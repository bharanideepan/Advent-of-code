var fs = require('fs');
var input = fs.readFileSync('Day2.txt', 'utf8');
var memory = input.toString()
    .split(',')
    .map(x => parseInt(x));
// var data = [1,9,10,3,2,3,11,0,99,30,40,50]
for(let noun = 0; noun < 100; noun++) {
    for(let verb = 0; verb < 100; verb++) {
        var flag = true;
        let data = [...memory]
        data[1] = noun;
        data[2] = verb;
        data.map(( element, index ) => {
            if(flag && (index === 0 || index%4 === 0)) {
                if(element === 1) {
                    data[data[index + 3]] = data[data[index + 1]] + data[data[index + 2]];
                } else if(element === 2) {
                    data[data[index + 3]] = data[data[index + 1]] * data[data[index + 2]];
                } else if(element === 99) {
                    flag = false;
                }
            }
            if(data[0] === 19690720 && flag) {
                console.log(100 * noun + verb);
                console.log(noun, verb);
                flag = false;
            }
        });
    }
}

// const getOutput = (memory) => {
//     for(let pointer = 0; pointer < memory.length; pointer++) {
//         if(memory[pointer] === 1) {
//             memory[memory[pointer + 3]] = memory[memory[pointer + 1]] + memory[memory[pointer + 2]];
//             pointer + 3;
//         } else if(memory[pointer] === 2) {
//             memory[memory[pointer + 3]] = memory[memory[pointer + 1]] * memory[memory[pointer + 2]];
//             pointer + 3
//         } else if(memory[pointer] === 99) {
//             break;
//         }
//     }
//     return memory[0];
// }

// for(let noun = 0; noun < 100; noun++) {
//     for(let verb = 0; verb < 100; verb++) {
//         let memory = [...data];
//         memory[1] = noun;
//         memory[2] = verb;
//         if(getOutput(memory) === 19690720) {
//             console.log(100 * noun + verb);
//             break;
//         }
//     }
// }
