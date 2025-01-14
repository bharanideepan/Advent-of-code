const crypto = require('crypto');
let possibleKeys = []
let validKeys = []
const updateThreeInRow = (char, index) => {
    const found = possibleKeys.find((key) => key.char == char && key.available)
    if (found) {
        possibleKeys = possibleKeys.map(key => {
            if (key.char == char) return { ...key, available: false, found: true }
            return key
        })
        validKeys.push({ ...found, available: false, end: index })
        validKeys.sort((a, b) => a.start - b.start)
    }
    //  else {
    //     possibleKeys.push({ char, index: 1, start: index, available: true })
    // }
}
const checkThreeInRow = (string, index) => {
    let temp = ""
    for (let i = 0; i < string.length - 2; i++) {
        const substring = string.slice(i, i + 3);
        if (substring[0] == substring[1] && substring[1] === substring[2]) {
            temp = substring[0];
        }
    }
    if (temp.length) {
        const found = possibleKeys.find((key) => key.char == temp && key.available)
        if (!found) {
            possibleKeys.push({ char: temp, index: 1, start: index, available: true })
        }
    }
}
const checkFiveInRow = (string, index) => {
    let temp = ""
    for (let i = 0; i < string.length - 4; i++) {
        const substring = string.slice(i, i + 5);
        if (substring[0] == substring[1] && substring[1] === substring[2] && substring[2] === substring[3] && substring[3] === substring[4]) {
            temp = substring[0];
        }
    }
    if (temp.length) {
        updateThreeInRow(temp, index)
    } else {
        checkThreeInRow(string, index)
    }
}
const continueLoop = () => {
    const x = possibleKeys.filter(key => key.available)
    const y = possibleKeys.filter(key => key.found)
    if (validKeys.length > 64) {
        console.log(x.map(e => e.start), " ===1")
        console.log(y.map(e => e.start), " ===2")
        return x.some(key => y.some(key2 => key.start < key2.start))
    } else {
        return true;
    }
}
const run = (input = 'abc', temp = 0) => {
    while (continueLoop()) {
        const hash = crypto.createHash('md5').update(`${input}${++temp}`).digest('hex')
        checkFiveInRow(hash, temp)
        possibleKeys = possibleKeys.map(key => {
            const newKey = { ...key, index: ++key.index }
            if (newKey.index > 1000) {
                return { ...newKey, available: false }
            }
            return newKey
        })
        // console.log(temp, validKeys.length)
    }
}
run()
console.log(validKeys)
console.log(validKeys.length)
console.log(validKeys[63].start)