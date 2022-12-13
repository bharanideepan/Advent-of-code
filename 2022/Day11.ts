const fs = require('fs');
const data = fs.readFileSync('Day11input.txt', 'utf8');
const inputData = data.toString().split('\n\n').map((x) => {
  const [a, b, c, d, e, f] = x.split('\n');
  const obj = {
    name: a.split(' ')[1].charAt(0),
    items: b.split(': ')[1].split(', ').map((item) => Number(item)),
    operation: c.split('new = old ')[1].split(' '),
    test: Number(d.split('divisible by ')[1]),
    true: e.split('throw to monkey ')[1],
    false: f.split('throw to monkey ')[1],
    inspections: 0
  }
  return obj;
});

const product = inputData.reduce((acc, value) => {
  return acc * value.test
}, 1);

const solve = (flag) => {
  const iteration = flag ? 20 : 10000
  const input = JSON.parse(JSON.stringify(inputData))
  for (let index = 0; index < iteration; index++) {

    for (let i = 0; i < input.length; i++) {
      const element = input[i];
      for (let j = 0; j < element.items.length; j++) {
        element.inspections += 1;
        const old = element.items[j];
        let newItem = 0;
        let [operation, value] = element.operation;
        value = value === 'old' ? old : +value;
        if (operation === '*') {
          newItem = old * value;
        } else if (operation === '+') {
          newItem = old + value
        }
        const newWorry = flag ? Math.floor(newItem / 3) : newItem % product; // 2nd part
        let toMonkey = newWorry % element.test === 0 ? element.true : element.false;
        input[toMonkey].items.push(newWorry);
      }
      element.items = []
    }
  }
  const [a, b] = input.sort((a, b) => b.inspections - a.inspections)
  return a.inspections * b.inspections
}


console.log('Part1 => ', solve(true))
console.log('Part2 => ', solve(false))