const input = 29000000
const presents2 = []
for (let e = 1; e < input / 10; e++) {
    let visits = 0
    for (let i = e; i < input / 10; i = i + e) {
        if (visits < 50) {
            if (!presents2[i]) presents2[i] = 11
            presents2[i] = presents2[i] + e * 11
            visits = visits + 1
        }
    }
}
const partTwo = presents2.reduce((min, current, index) => (min === 0 && current >= input) ? min = index : min, 0)
console.log(partTwo)