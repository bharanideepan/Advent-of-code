var fs = require("fs");
var input = fs.readFileSync("Day3.txt", "utf8").replaceAll("\n","")
regex = /(mul)\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
match = input.match(regex);
const getOutput = (part1=true) => {
    let result = 0;
    let flag = true;
    input.replace(regex, (match, opt, num1, num2) => {
        if (opt === "mul") {
            if (part1 || flag) {
                result += Number(num1) * Number(num2);
            }
        } else if (!part1) {
            if (match === "do()") flag = true;
            if (match === "don't()") flag = false;
        }
    });
    return result
}
console.log(getOutput());
console.log(getOutput(false));
// old logic
    // match.map((x) => {
    //     if(x.includes("mul")) {
    //         if(flag){
    //             x = x.replaceAll("mul(", "")
    //             x = x.replaceAll(")", "")
    //             const [a,b] = x.split(",")
    //             result += Number(a)*Number(b)
    //         }
    //     }
    //     if(!part1){
    //         if(x==="do()"){flag=true}
    //         if(x==="don't()"){flag=false}
    //     }
    // })