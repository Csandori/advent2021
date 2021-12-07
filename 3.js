let data = require("./3input.js");
let lines = data.data.split(/[\r\n]/gm).map((el) => el.trim());

// PART 1

let twoD = [];
for (let i = 0; i < lines.length; i++) {
  let elements = lines[i].trim().split("");
  twoD.push(elements);
}
let codes = [];
for (let i = 0; i < twoD[0].length; i++) {
  codes.push("");
}
for (let i = 0; i < twoD.length; i++) {
  for (let j = 0; j < twoD[i].length; j++) {
    codes[j] += String(twoD[i][j]);
  }
}
let code = "";
let code2 = "";
codes.forEach((el) => {
  let numbers = el.split("");
  if (
    numbers.filter((el2) => el2 === "0").length >
    numbers.filter((el2) => el2 === "1").length
  ) {
    code += "0";
    code2 += "1";
  } else {
    code += "1";
    code2 += "0";
  }
});
console.log(parseInt(code, 2) * parseInt(code2, 2));

// PART 2

function calculate(array, position, prefer) {
  let returnArray = [];
  let count = { 0: 0, 1: 0 };
  for (let i = 0; i < array.length; i++) {
    count[array[i][position]]++;
  }
  let preferred =
    prefer === "0"
      ? count[0] === count[1]
        ? prefer
        : count[0] > count[1]
        ? prefer === "1"
          ? "0"
          : "1"
        : "0"
      : count[0] === count[1]
      ? prefer
      : count[0] > count[1]
      ? "0"
      : "1";
  for (let i = 0; i < array.length; i++) {
    if (array[i][position] === preferred) {
      returnArray.push(array[i]);
    }
    if (i === array.length - 1 && returnArray.length === 0) {
      returnArray.push(array[i]);
    }
  }
  return returnArray;
}
let tempLines = JSON.parse(JSON.stringify(lines));
let tempLines2 = JSON.parse(JSON.stringify(lines));
for (let i = 0; i < lines[0].length; i++) {
  tempLines = calculate(tempLines, i, "1");
  tempLines2 = calculate(tempLines2, i, "0");
}
console.log(parseInt(tempLines, 2) * parseInt(tempLines2, 2));
