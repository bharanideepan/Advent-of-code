let x = `#########
#S| | | #
#-#-#-#-#
# | | | #
#-#-#-#-#
# | | | #
#-#-#-#-#
# | | |E 
####### V`.split("\n").map(e => e.trim().split(""))
const countPossibilities = (grid, start, end) => {
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [
        [0, 1, 'R'],
        [1, 0, 'D'],
        [0, -1, 'L'],
        [-1, 0, 'U'],
    ];
    const findPaths = (start, end) => {
        let pathCount = 0;
        let pathsArr = [];
        const dfs = (currentRow, currentCol, visited, paths) => {
            if (end[0] == currentRow && end[1] == currentCol) {
                pathCount++;
                pathsArr.push(paths.join(""))
                return;
            }
            visited.add(`${currentRow},${currentCol}`);
            directions.map(([dx, dy, d], index) => {
                const newRow = currentRow + dx;
                const newCol = currentCol + dy;

                if (
                    newRow >= 0 && newRow < rows &&
                    newCol >= 0 && newCol < cols &&
                    !visited.has(`${newRow},${newCol}`) &&
                    grid[newRow][newCol] != "#"
                ) {
                    dfs(newRow + dx, newCol + dy, visited, [...paths, d]);
                }
            })
            visited.delete(`${currentRow},${currentCol}`);
        };
        const visited = new Set();
        dfs(start[0], start[1], visited, []);
        return { pathCount, pathsArr };
    };
    return findPaths(start, end);
};
let start = [1, 1]
let end = [7, 7]
const result = countPossibilities(x, start, end)
console.log(result)