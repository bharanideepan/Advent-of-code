const fs = require('fs')

fs.readFile('Day1-frequencycalibration.txt', (err, data) => { 
    if (err) throw err
    let frequencies = data
        .toString()
        .split('\n')
        .map(x => parseInt(x));
    let currentFrequency = 0;
  
    for (let frequency of frequencies) {
        currentFrequency += frequency;
    }
  
    console.log(currentFrequency)
})