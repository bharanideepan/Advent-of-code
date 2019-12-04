var fs = require('fs');
var data = fs.readFileSync('Day1input.txt', 'utf8');

var totalFuel = data.toString()
        .split('\n')
        .map(mass => Math.floor(parseInt(mass)/3) - 2)
        .reduce((acc, cur) => acc + cur);
console.log('1st ==> ',totalFuel);

const masses = data.toString()
        .split('\n')
        .map(mass => parseInt(mass));
const calculateFuel = (mass) => (Math.floor(mass/3) - 2)
const fuels = [];
masses.forEach(mass => {
    let totalFuel = 0;
    let fuel = mass;
    do {
        fuel = calculateFuel(fuel);
        totalFuel = totalFuel + fuel;
    } while(fuel > 8);
    fuels.push(totalFuel);
});

console.log('2nd ==> ',fuels.reduce((acc,cur) => acc + cur));