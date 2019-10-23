const fs = require('fs')
fs.readFile('Day1-frequencycalibration.txt', (err, data) => { 
    if (err) throw err
    let frequencies = data
        .toString()
        .split('\n')
        .map(x => parseInt(x));
    
        let currentFrequency = 0;
        let i = 0;
        let pastFrequencies = [];
      
        do {
          if (i === frequencies.length) {
            i = 0;
          }
          currentFrequency += frequencies[i];
          if(pastFrequencies.includes(currentFrequency)) {
            break;
          }
          pastFrequencies.push(currentFrequency);
          i++;
        } while(true)
        
        console.log(currentFrequency)
})