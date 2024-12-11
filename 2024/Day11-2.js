var input = '2701 64945 0 9959979 93 781524 620 1'.split(" ").map(e => e.trim())

let result = 0;
let obj = {};
for (let i = 0; i < input.length; i++) {
    const stone = input[i];
    obj[stone] = { new: true, count: 1 };
}
for (let index = 0; index < 75; index++) {
    const newObj = {};
    Object.keys(obj).map((stone) => {
        const count = obj[stone].count;
        if (stone == '0') {
            newObj['1'] = newObj['1'] ? { new: true, count: newObj['1'].count + count } : { new: true, count };
        } else if (stone.length % 2 == 0) {
            const newStones = [`${Number(stone.slice(0, stone.length / 2))}`, `${Number(stone.slice(stone.length / 2))}`]
            newObj[newStones[0]] = newObj[newStones[0]] ? { new: true, count: newObj[newStones[0]].count + count } : { new: true, count }
            newObj[newStones[1]] = newObj[newStones[1]] ? { new: true, count: newObj[newStones[1]].count + count } : { new: true, count }
        } else {
            const newStone = `${(Number(stone) * 2024)}`;
            newObj[newStone] = newObj[newStone] ? { new: true, count: newObj[newStone].count + count } : { new: true, count }
        }
        if (newObj[stone] && !newObj[stone].new) {
            delete newObj[stone];
        }
    })
    Object.keys(newObj).map((stone) => { newObj[stone].new = false })
    obj = { ...newObj };
}
console.log(Object.values(obj).reduce((acc, val) => acc + val.count, 0));
