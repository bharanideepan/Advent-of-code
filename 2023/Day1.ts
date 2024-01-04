var fs = require("fs");
var data = fs.readFileSync("Day1input.txt", "utf8");
input = input.map((e) => e.split("").filter((e) => e != "\r"));
let count = 0;
input.forEach((element) => {
  let firstDigit;
  let lastDigit;
  element.forEach((x) => {
    if (!isNaN(x)) {
      console.log(x);
      firstDigit = firstDigit ? firstDigit : x;
      lastDigit = x;
    }
  });
  const result = parseInt(`${firstDigit}${lastDigit}`);
  count += result;
});
console.log(count);
