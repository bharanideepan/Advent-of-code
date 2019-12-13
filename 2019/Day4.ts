var validPasswords = [];
const isValid = (password) => {
    let lastDigit = 0;
    let doubleDigit = false;
    let count = 1;
    for(let digit of password) {
        if(Number(digit) < lastDigit)return false;
        if(Number(digit) == lastDigit)count++
        else {
            if(count == 2)doubleDigit = true;
            count = 1;
        }
        lastDigit = Number(digit);
    }
    if(count == 2)doubleDigit = true;
    return doubleDigit;
}
for(let start = 359282; start < 820401; start++) {
    let password = start.toString().split('');
    if(isValid(password))validPasswords.push(password);
}
console.log(validPasswords.length)