let x = `%qm -> mj, xn
&mj -> hz, bt, lr, sq, qh, vq
%qc -> qs, vg
%ng -> vr
%qh -> sq
&bt -> rs
%hh -> qs, bx
%gk -> cs, bb
%js -> mj
%pc -> mj, mr
%mb -> rd, xs
%tp -> qs, ks
%xq -> tp, qs
%bx -> sz
%mn -> cs, md
%cv -> rd
%rh -> rd, sv
%md -> cs
%pz -> mj, vq
%bz -> rd, hk
%jz -> vk
%sz -> jz
%lr -> pz, mj
%xs -> cv, rd
%kl -> rd, mb
%hz -> pc
%hk -> rz, rd
%vk -> qc
%bh -> zm
%vq -> qm
%ks -> qs, nd
&qs -> dl, jz, bx, vk, vg, hh, sz
&dl -> rs
%lf -> rh, rd
&fr -> rs
%xn -> mj, qh
%hf -> qs, xq
%sv -> rd, ng
&rs -> rx
&rd -> ng, fr, rz, lf, vr
%cj -> ss, cs
broadcaster -> hh, lr, bp, lf
%zs -> cs, mn
%vr -> bz
%nd -> qs
%jb -> cj, cs
&rv -> rs
%bp -> cs, lx
%ss -> zs
%lx -> gk
&cs -> lx, ss, rv, bh, bp
%bb -> bh, cs
%mf -> mj, hz
%zm -> cs, jb
%mr -> mj, js
%rz -> kl
%vg -> hf
%sq -> mf`
  .split("\n")
  .map((line) => line.split(" -> "));
let FLIPFLOP = "FLIPFLOP";
let CONJUNCTION = "CONJUNCTION";
let input = {};
const init = () => {
  input = x
    .map((line) => {
      const [module, modules] = line;
      let moduleName = module;
      let moduleType = "";
      const isOn = false;
      const isHigh = false;
      const destinationModules = modules.split(", ");
      const inputs = new Array();
      if (module.indexOf("%") > -1) {
        moduleName = module.replace("%", "");
        moduleType = FLIPFLOP;
      } else if (module.indexOf("&") > -1) {
        moduleName = module.replace("&", "");
        moduleType = CONJUNCTION;
      }
      return {
        moduleName,
        moduleType,
        destinationModules,
        isOn,
        inputs,
        isHigh,
      };
    })
    .reduce((acc, val) => ({ ...acc, [val.moduleName]: val }), {});
  Object.keys(input).forEach((moduleName) => {
    input[moduleName].destinationModules.forEach((destinationModuleName) => {
      const destinationModule = input[destinationModuleName];
      if (destinationModule) {
        if (destinationModule.moduleType === CONJUNCTION) {
          destinationModule.inputs.push(moduleName);
        }
      }
    });
  });
};
init();
const arr = new Array();
const sourceOfRx = Object.keys(input).find((key) =>
  input[key].destinationModules.includes("rx")
);
let flag = false;
const sendPulse = (from, isHigh, sourceOfSourceOfRx) => {
  const source = input[from];
  source.destinationModules.forEach((destinationModuleName) => {
    const target = input[destinationModuleName];
    if (
      from === sourceOfSourceOfRx &&
      destinationModuleName === sourceOfRx &&
      isHigh
    ) {
      flag = true;
    }
    if (target) {
      if (target.moduleType === FLIPFLOP) {
        if (!isHigh) {
          target.isOn = !target.isOn;
          if (target.isOn) {
            arr.push({ from: destinationModuleName, isHigh: true });
          } else {
            arr.push({ from: destinationModuleName, isHigh: false });
          }
        }
      } else if (target.moduleType === CONJUNCTION) {
        if (target.inputs.length === 1) {
          arr.push({ from: destinationModuleName, isHigh: !isHigh });
        } else {
          if (target.inputs.every((conInput) => input[conInput].isOn)) {
            arr.push({ from: destinationModuleName, isHigh: false });
          } else {
            arr.push({ from: destinationModuleName, isHigh: true });
          }
        }
      }
    }
  });
};
const pressCounts = new Array();
for (let sourceOfSourceOfRx of input[sourceOfRx].inputs) {
  init();
  let pressCount = 0;
  flag = false;
  while (flag === false) {
    arr.push({ from: "broadcaster", isHigh: false });
    while (arr.length) {
      const { from, isHigh } = arr.shift();
      sendPulse(from, isHigh, sourceOfSourceOfRx);
    }
    pressCount++;
  }
  pressCounts.push(pressCount);
}

function gcd(a, b) {
  if (b == 0) return a;
  return gcd(b, a % b);
}
function findlcm(arr, n) {
  let ans = arr[0];
  for (let i = 1; i < n; i++) ans = (arr[i] * ans) / gcd(arr[i], ans);
  return ans;
}
let n = pressCounts.length;
console.log(pressCounts);
console.log(findlcm(pressCounts, n));
