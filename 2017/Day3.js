function sqrt(num) {
    return Math.sqrt(num);
}

function pos(index) {
    const r = Math.floor((sqrt(index - 1) + 1) / 2);
    const d = 2 * r - 1;
    const i = index - d * d - 1;

    if (i < d) {
        return [r, i - r + 1];
    } else if (i < 2 * d + 2) {
        return [r - i + d, r];
    } else if (i < 3 * d + 2) {
        return [-r, r - i - 1 + 2 * d + 2];
    } else {
        return [i - r - 3 * d - 2, -r];
    }
}

const data = 1024

// Calculate the first part
const coordinates = pos(data);
const sumOfAbs = coordinates.reduce((acc, val) => acc + Math.abs(val), 0);
console.log(sumOfAbs);

// Calculate the second part
const m = new Map();
m.set('0,0', 1);
let s = 1, i = 2;

while (s <= data) {
    const [x, y] = pos(i);
    i++;
    s = 0;

    for (let j = -3; j <= 5; j++) {
        const nx = x + (j % 3) - 1;
        const ny = y + Math.floor(j / 3);
        s += m.get(`${nx},${ny}`) || 0;
    }

    m.set(`${x},${y}`, s);
}

console.log(s);
