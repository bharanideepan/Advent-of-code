let target = 29000000;
let houseNumber = 1;
outer: while (true) {
    let temp = 0;
    for (let i = 1; i <= houseNumber; i++) {
        if (houseNumber % i == 0) {
            temp += i * 10
        }
        if (temp == target) {
            console.log(houseNumber, 1);
            break outer;
        }
        if (temp > target) {
            console.log(houseNumber, temp)
            console.log(houseNumber, 2);
            break;
        }
    }
    houseNumber++;
}