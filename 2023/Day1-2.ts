var fs = require("fs");
var data = fs.readFileSync("Day1input.txt", "utf8");

var input = data.toString().split("\n");
let count = 0;
let mock = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
};
const countSubstrings = (str, searchValue) => {
  let count = 0,
    i = 0;
  while (true) {
    const r = str.indexOf(searchValue, i);
    if (r !== -1) [count, i] = [count + 1, r + 1];
    else return count;
  }
};
input.forEach((element) => {
  let firstDigit;
  let lastDigit;
  let firstDigitIndex;
  let lastDigitIndex;
  const logic = (index, digit) => {
    if (index > -1) {
      if (firstDigitIndex == undefined || firstDigitIndex >= index) {
        firstDigitIndex = index;
        firstDigit = digit;
      }
      if (lastDigitIndex == undefined || lastDigitIndex <= index) {
        lastDigitIndex = index;
        lastDigit = digit;
      }
    }
  };
  Object.keys(mock).forEach((mo) => {
    const count = countSubstrings(element, mo);
    logic(element.indexOf(mo), mock[mo]);
    if (count > 1) {
      logic(element.lastIndexOf(mo), mock[mo]);
    }
  });
  const result = parseInt(`${firstDigit}${lastDigit}`);
  count += result;
});
console.log(count);
