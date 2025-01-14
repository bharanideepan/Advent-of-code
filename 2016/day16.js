let length = 35651584
let start = '10010000000110000'

while (start.length < length) {
    const temp = start.split("").reverse().map(e => e == "1" ? "0" : "1").join("")
    start = `${start}0${temp}`
}
start = start.slice(0, length)
while (start.length % 2 == 0) {
    const checksum = []
    for (let i = 0; i < start.length - 1; i += 2) {
        const substring = start.slice(i, i + 2);
        checksum.push(substring[0] == substring[1] ? 1 : 0)
    }
    start = checksum.join("")
}
console.log(start)