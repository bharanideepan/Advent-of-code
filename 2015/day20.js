let target = 29000000;
let index = 665000;
while (true) {
    function findDivisors(number) {
        const divisors = [];
        for (let i = 1; i <= number; i++) {
            if (number % i === 0) {
                divisors.push(i);
            }
        }
        return divisors;
    }
    const presents = findDivisors(index).map(e => e * 10).reduce((a, v) => a + v)
    console.log(index, presents);
    if (presents >= target) {
        console.log(index);
        break;
    }
    index++
}