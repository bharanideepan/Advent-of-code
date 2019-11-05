const fs = require('fs')

fs.readFile('Day2-idinput.txt', (err, data) =>{
    let ids = data
            .toString()
            .split('\n')
    for(let id of ids) {
        let startPoint = ids.indexOf(id)
        for(let i = 0; i < id.length; ++i){
            for(let j = startPoint+1; j < ids.length; ++j) {
                let a = id.slice(0,i)+id.slice(i+1), b = ids[j].slice(0,i)+ids[j].slice(i+1)
                if(id.slice(0,i)+id.slice(i+1) === ids[j].slice(0,i)+ids[j].slice(i+1)) {
                    console.log(a, b)
                }
            }
        }
    }
})