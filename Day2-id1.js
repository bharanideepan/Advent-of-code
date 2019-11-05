const fs = require('fs')

fs.readFile('Day2-idinput.txt', (err, data) =>{
    let ids = data
            .toString()
            .split('\n')
    let doubles = 0
    let triples = 0
    for(let id of ids) {
        let repeatingCounts = []
        for(let char of id) {
            var regExp = new RegExp(char,'gi')
            repeatingCounts.push(id.match(regExp).length)
        }
        if(repeatingCounts.includes(2)){
            doubles += 1
        }
        if(repeatingCounts.includes(3)){
            triples += 1
        }
    }
    console.log(doubles*triples)
})