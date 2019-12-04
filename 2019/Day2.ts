var fs = require('fs');
var input = fs.readFileSync('Day2.txt', 'utf8');
var data = input.toString()
    .split(',')
    .map(x => parseInt(x));
// var data = [1,9,10,3,2,3,11,0,99,30,40,50]
var flag = true;
data[1] = 12;
data[2] = 2;
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
});
console.log(data)