var fs = require('fs');
var input = fs.readFileSync('Day3.txt', 'utf8');
const wires = input.toString().split('\n');
const firstWire = wires[0].split(',');
const secondWire = wires[1].split(',');

var firstWireCoordinates = new Map();
var secondWireCoordinates = new Map();
var distances = [];
var previousCoordinate = {x: 0, y: 0, z: 0};
const getCoordinates = (paths, coordinates) => {
    let step = 0;
    for (let path of paths) {
        let distance = Number(path.match(/(\d+)/)[0]);
        let newCoordinate;
        if(path[0] === 'U'){
            for(let i = previousCoordinate.y + 1, j = i + distance; i < j; i++) {
                newCoordinate = {...previousCoordinate, y: i, z: ++step}
                coordinates.set(`${newCoordinate.x}x${newCoordinate.y}`, newCoordinate)
            }
        }
        if(path[0] === 'R'){
            for(let i = previousCoordinate.x + 1, j = i + distance; i < j; i++) {
                newCoordinate = {...previousCoordinate, x: i, z: ++step}
                coordinates.set(`${newCoordinate.x}x${newCoordinate.y}`, newCoordinate)
            }
        }
        if(path[0] === 'D'){
            for(let i = previousCoordinate.y - 1, j = 0; j < distance; i--, j++) {
                newCoordinate = {...previousCoordinate, y: i, z: ++step}
                coordinates.set(`${newCoordinate.x}x${newCoordinate.y}`, newCoordinate)
            }
        }
        if(path[0] === 'L'){
            for(let i = previousCoordinate.x - 1, j = 0; j < distance; i--, j++) {
                newCoordinate = {...previousCoordinate, x: i, z: ++step}
                coordinates.set(`${newCoordinate.x}x${newCoordinate.y}`, newCoordinate)
            }
        }
        previousCoordinate = newCoordinate;
    }
    previousCoordinate = {x: 0, y: 0, z: 0};
}
// getCoordinates(['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51'], firstWireCoordinates)
// getCoordinates(['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7'], secondWireCoordinates)
// getCoordinates(['R75','D30','R83','U83','L12','D49','R71','U7','L72'], firstWireCoordinates)
// getCoordinates(['U62','R66','U55','R34','D71','R55','D58','R83'], secondWireCoordinates)
// getCoordinates(['R8','U5','L5','D3'], firstWireCoordinates)
// getCoordinates(['U7','R6','D4','L4'], secondWireCoordinates)
getCoordinates(firstWire, firstWireCoordinates)
getCoordinates(secondWire, secondWireCoordinates)
let steps = [];
firstWireCoordinates.forEach((value, key) => {
    if(secondWireCoordinates.has(key)) {
        distances.push(Math.abs(value.x) + Math.abs(value.y))
        steps.push(value.z + secondWireCoordinates.get(key).z);
    }
});
console.log('1st puzzle===> ',Math.min(...distances));
console.log('2nd puzzle===> ',Math.min(...steps));

