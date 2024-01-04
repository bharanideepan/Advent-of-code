let x = `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`;

let [a, b] = x.split("\n\n");
let rules = a.split("\n").reduce((acc, rule) => {
  const [workflowName, workflow] = rule.replace("}", "").split("{");
  const parsedWorkflow = workflow.split(",").map((segment) => {
    let parsedSegment = {};
    if (segment.indexOf(":") > -1) {
      const [condition, destination] = segment.split(":");
      let [category, rating, operator] = ["", "", ""];
      if (condition.indexOf("<") > -1) {
        operator = "<";
        [category, rating] = condition.split("<");
      }
      if (condition.indexOf(">") > -1) {
        operator = ">";
        [category, rating] = condition.split(">");
      }
      parsedSegment = { category, operator, rating: +rating, destination };
    } else {
      parsedSegment = { destination: segment };
    }
    return parsedSegment;
  });
  return { ...acc, [workflowName]: parsedWorkflow };
}, {});
let parts = b.split("\n").map((part) => {
  return part
    .replace("{", "")
    .replace("}", "")
    .split(",")
    .reduce((acc, val) => {
      const [category, rating] = val.split("=");
      return { ...acc, [category]: +rating };
    }, {});
});
let result = 0;
for (let index = 0; index < parts.length; index++) {
  let start = "in";
  const part = parts[index];
  let i = 0;
  while (true) {
    console.log(start, i);
    const { category, operator, rating, destination } = rules[start][i];
    let conditionSatisfied = false;
    if (!category) {
      conditionSatisfied = true;
      start = destination;
    }
    if (operator === "<" && part[category] < rating) {
      conditionSatisfied = true;
      start = destination;
    }
    if (operator === ">" && part[category] > rating) {
      conditionSatisfied = true;
      start = destination;
    }
    if (conditionSatisfied) {
      i = 0;
      if (destination === "A") {
        result += Object.values(part).reduce((a, b) => {
          return a + b;
        }, 0);
        break;
      }
      if (destination === "R") {
        break;
      }
    } else {
      i++;
    }
  }
}
console.log(result);
