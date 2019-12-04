const fs = require('fs')

fs.readFile('day1Input.txt', (err, data) => { 
    if (err) throw err
    let input = data
        .toString()
        .split('')
    let total = 0
    let flag = true
    let position = 0
    // let upward = input.filter(bracket => bracket === '(')
    // let downward = input.filter(bracket => bracket === ')')
  
    // console.log(upward.length-downward.length)

    input.forEach((character,index) => {
        total += (character === '(') ? 1 : -1
        if(total === -1 && flag){
            flag = false
            position = index + 1
        }
    })

    console.log(total)
    console.log(position)
})