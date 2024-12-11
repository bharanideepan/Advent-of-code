let input = '3113322113'
for (let index = 0; index < 50; index++) {
    let prev = '';
    let result = [];
    for (let index = 0; index < input.length; index++) {
        if (prev == input[index]) {
            result[result.length - 1].count++
        } else {
            prev = input[index]
            result.push({ char: input[index], count: 1 })
        }
    }
    input = result.map(({ char, count }) => `${count}${char}`).join("")
    console.log(input.length)
}