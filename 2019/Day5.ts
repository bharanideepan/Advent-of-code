var fs = require('fs');
var readline = require('readline-sync');
var input = fs.readFileSync('Day5.txt', 'utf8');
var memory = input.toString()
    .split(',')
    .map(x => parseInt(x));

const run = () => {
    let data = [...memory]
    for(let index = 0; index < data.length; index++) {
    
        let opCode = data[index] % 100;
        let modes = Math.floor(data[index] / 100)
        // let modes = 110
        let firstParameterMode = modes % 10 === 0 ? 0 : 1;
        let secondParameterMode = (Math.floor(modes / 10)) % 10 === 0 ? 0 : 1;
        let firstParameter = firstParameterMode ? data[index + 1]: data[data[index + 1]];
        let secondParameter = secondParameterMode ? data[index + 2]: data[data[index + 2]];
    
        switch(opCode) {
            case 1:
                data[data[index + 3]] = firstParameter + secondParameter;
                index = index + 3;
                break;
            case 2:
                data[data[index + 3]] = firstParameter * secondParameter;
                index = index + 3;
                break;
            case 3:
                data[data[index + 1]] = Number(readline.question("Enter a number.."));
                index++;
                break;
            case 4:
                console.log(data[data[index + 1]]);
                index++;
                break;
            case 99:
                return data[0];
            
        }
        
    }
}

run();