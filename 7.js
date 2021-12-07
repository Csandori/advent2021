let data = require("./7input.js");
let values = data.data
  .split(",")
  .map((el) => parseInt(el))
  .sort((a, b) => {
    return a - b;
  });

// PART 1

let modusIndex =
  values.length % 2 ? (values.length - 1) / 2 : values.length / 2;
let modusValue = values[modusIndex];

let answer = values.reduce((a, b) => {
  return a + Math.abs(b - modusValue);
}, 0);

console.log("PART 1");
console.log(answer);

// PART 2

getIndex(values, 1, values.length - 2);

function getIndex(array, min, max) {
  let newIndex = Math.round((min + max) / 2);
  for (; getValue(array, newIndex) === getValue(array, newIndex + 1); ) {
    newIndex++;
  }
  if (getValue(array, newIndex) > getValue(array, newIndex + 1)) {
    min = newIndex;
  } else if (getValue(array, newIndex) < getValue(array, newIndex + 1)) {
    max = newIndex;
  }
  if (min === max || Math.abs(min - max) < 2) {
    console.log("PART 2");
    console.log(Math.min(getValue(array, min), getValue(array, max)));
    return min;
  }
  getIndex(array, min, max);
}

function getValue(array, position) {
  return array.reduce((a, b) => {
    a += (Math.abs(b - position) * (Math.abs(b - position) + 1)) / 2;
    return a;
  }, 0);
}
