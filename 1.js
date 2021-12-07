let data = require("./1input.js");
let lines = data.data.split(/[\r\n]/gm).map((el) => parseInt(el));

// PART 1

let count = 0;
for (let i = 1; i < lines.length; i++) {
  if (lines[i] > lines[i-1]) count++;
}
console.log(count);

// PART 2

let count2 = 0;
for (let i = 3; i < lines.length; i++) {
  if (
    lines[i] + lines[i - 1] + lines[i - 2] >
    lines[i - 1] + lines[i - 2] + lines[i - 3]
  )
    count2++;
}
console.log(count2);
