const fs = require('fs')
fs.readFile('Day3-claiminput.txt', (err, data) => {
    const input = data.toString().split('\n')
    var coordinates = new Map()
    var idsWithStatus = new Map()
    var overlaps = 0
    var splitClaim = (claim) => {
        const [
            _='',
            id='',
            x_coordinate='',
            y_coordinate='',
            width='',
            height='',
        ] = claim.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/)
        return {
            id,
            row: {
                start: parseInt(x_coordinate),
                end: parseInt(x_coordinate) + parseInt(width)
            },
            column: {
                start: parseInt(y_coordinate),
                end: parseInt(y_coordinate) + parseInt(height)
            }
        }
    }
    input.forEach(claim => {
        let claimProperties = splitClaim(claim)
        idsWithStatus.set(claimProperties.id, true)
        for(
            let x_coordinate = claimProperties.row.start;
            x_coordinate < claimProperties.row.end;
            x_coordinate++
        ) {
            for(
                let y_coordinate = claimProperties.column.start;
                y_coordinate < claimProperties.column.end;
                y_coordinate++
            ) {
                let coordinate = `${x_coordinate},${y_coordinate}`
                if(!coordinates.has(coordinate)){
                    coordinates.set(coordinate, {
                        ids: [claimProperties.id],
                        notCounted: true
                    })
                    continue
                }
                if(!coordinates.get(coordinate).ids.includes(claimProperties.id)
                        && coordinates.get(coordinate).notCounted) {
                    overlaps++
                    coordinates.set(coordinate, {
                        ids: [...coordinates.get(coordinate).ids, claimProperties.id],
                        notCounted: false
                    })
                    coordinates.get(coordinate).ids.forEach(id => {
                        idsWithStatus.set(id, false)
                    })
                    continue
                }
            }
        }
    })
    //1st puzzle
    console.log(overlaps)
    //2nd puzzle
    input.forEach(claim => {
        let claimProperties = splitClaim(claim)
        if(idsWithStatus.get(claimProperties.id)){
           console.log(claimProperties.id)
        }
    })
})