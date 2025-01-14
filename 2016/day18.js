const run = (length) => {
    let input = '.^^^.^.^^^^^..^^^..^..^..^^..^.^.^.^^.^^....^.^...^.^^.^^.^^..^^..^.^..^^^.^^...^...^^....^^.^^^^^^^'.split("")
    let result = input.reduce((acc, val) => acc + (val == "." ? 1 : 0), 0)
    for (let index = 0; index < (length - 1); index++) {
        let newRow = input.map((e, i, a) => {
            const temp = `${a[i - 1] ?? '.'}${a[i]}${a[i + 1] ?? '.'}`
            if (['.^^', '^^.', '^..', '..^'].includes(temp)) {
                return '^'
            }
            result++
            return '.'
        })
        input = newRow
    }
    console.log(result)
}
run(40)
run(400000)