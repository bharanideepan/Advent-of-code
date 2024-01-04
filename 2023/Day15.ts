let x = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;
let result = 0;
let input = x.split(",").map((step) => {
  let label = step;
  if (step.indexOf("=") > -1) {
    label = step.split("=")[0];
  } else if (step.indexOf("-") > -1) {
    label = step.split("-")[0];
  }
  let currentValue = 0;
  step.split("").map((char, index) => {
    const ascii = step.charCodeAt(index);
    currentValue += ascii;
    currentValue *= 17;
    currentValue = currentValue % 256;
    return { char, currentValue };
  });
  result += currentValue;
});
console.log(result);
