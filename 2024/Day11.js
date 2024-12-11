var input = '2701 64945 0 9959979 93 781524 620 1'.split(" ").map(e => e.trim())

for (let index = 0; index < 25; index++) {
    console.log(index)
    let newInput = [];
    for (let i = 0; i < input.length; i++) {
        const element = input[i];
        if (element == '0') {
            newInput.push('1');
            continue;
        }
        if (element.length % 2 == 0) {
            const newStones = [element.slice(0, element.length / 2), element.slice(element.length / 2)]
            newInput.push(newStones[0], `${Number(newStones[1])}`);
        } else {
            newInput.push(`${(Number(element) * 2024)}`)
        }
    }
    input = [...newInput]
}
console.log(input.length)