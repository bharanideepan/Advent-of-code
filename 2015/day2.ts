var fs = require('fs');
var data = fs.readFileSync('day2Input.txt', 'utf8');
var dimentions = data.toString().split('\n');
var totalArea = 0
var totalLength = 0
var splitDimention = (dimention) => {
    const [_='',x='',y='',z=''] = dimention.match(/(\d+)x(\d+)x(\d+)/)
    let dimentionInArray = [Number(x), Number(y), Number(z)]
    return {...dimentionInArray}
}
var calculateArea = (dimention) => {
    return 2*dimention[0]*dimention[1]
        + 2*dimention[1]*dimention[2]
        + 2*dimention[2]*dimention[0]
        + Math.min(dimention[0]*dimention[1], dimention[1]*dimention[2], dimention[2]*dimention[0])
}
var calculateLength = (dimention) => {
    const length = dimention[0]
    const width = dimention[1]
    const height = dimention[2]
    return Math.min(2*(length+width),2*(height+width),2*(length+height))
        + (length*height*width)
}
dimentions.forEach(dimention => {
    var splitedDimention = splitDimention(dimention)   
    totalArea += calculateArea(splitedDimention)
    totalLength += calculateLength(splitedDimention)
});
console.log(totalArea)
console.log(totalLength)