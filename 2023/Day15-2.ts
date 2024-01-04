let x = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;
let input = x.split(",").map((step) => {
  let label = step;
  let operation = "=";
  let length = 0;
  if (step.indexOf("=") > -1) {
    label = step.split("=")[0];
    length = Number(step.split("=")[1]);
  } else if (step.indexOf("-") > -1) {
    label = step.split("-")[0];
    operation = "-";
  }
  let currentValue = 0;
  label.split("").map((char, index) => {
    const ascii = label.charCodeAt(index);
    currentValue += ascii;
    currentValue *= 17;
    currentValue = currentValue % 256;
  });
  return { label, box: currentValue, operation, length };
});
const boxes = new Array(256);
input.forEach((step) => {
  const lenses = boxes[step.box];
  if (step.operation === "-") {
    if (lenses) {
      if (lenses.find((lense) => lense.label === step.label)) {
        boxes[step.box] = lenses.filter((lense) => lense.label != step.label);
      }
    }
  } else if (step.operation === "=") {
    if (!lenses) {
      boxes[step.box] = [{ label: step.label, length: step.length }];
    } else {
      let lense = lenses.find((lense) => lense.label === step.label);
      if (lense) {
        const index = lenses.indexOf(lense);
        lenses[index] = { label: step.label, length: step.length };
      } else {
        boxes[step.box] = [
          ...lenses,
          { label: step.label, length: step.length },
        ];
      }
    }
  }
});
console.log(boxes);
let power = 0;
boxes.forEach((box, index) => {
  if (box.length) {
    box.forEach((lense, j) => {
      power += (index + 1) * (j + 1) * lense.length;
    });
  }
});
console.log(power);
