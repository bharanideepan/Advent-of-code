let grid = [];
let last = 20151125;
let x = 2947
let y = 3029
let getNext = () => last = ((last * 252533) % 33554393)
for (let index = 0; index < (x + y); index++) {
    grid.push([])
    for (let i = grid.length - 1; i >= 0; i--) {
        grid[i].push(grid.length == 1 ? last : getNext())
    }
}
console.log(grid[x - 1][y - 1])
