const fs = require('fs')
var input = fs.readFileSync("Day14.txt", "utf8").split("\n").map(e => {
    const regex = /(?<name>\w+)\s+can\s+fly\s+(?<speed>\d+)\s+km\/s\s+for\s+(?<flyDuration>\d+)\s+seconds,?\s+but\s+then\s+must\s+rest\s+for\s+(?<restDuration>\d+)\s+seconds/;
    const match = e.trim().match(regex);
    if (match) {
        const { name, speed, flyDuration, restDuration } = match.groups;
        return { name, speed: Number(speed), flyDuration: Number(flyDuration), restDuration: Number(restDuration) }
    } else {
        console.log("No match found");
    }
})
const total = 2503;
let max = 0;
for (let index = 0; index < input.length; index++) {
    const element = input[index];
    const { name, speed, flyDuration, restDuration } = element;
    const duration = flyDuration + restDuration;
    let distance = 0;
    if (total % duration == 0) {
        distance = speed * flyDuration * Math.floor(total / duration)
    } else {
        const extra = total % duration;
        distance = (speed * flyDuration * Math.floor(total / duration)) + (speed * (extra >= flyDuration ? flyDuration : extra))
    }
    if (max < distance) max = distance
}
console.log(max)