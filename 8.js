let data = require("./8input.js");
let input = data.data.split(/[\r\n]/gm).map((el) => el.split("|"));
input = input.map((el) => el.map((el2) => el2.trim().split(" ")));

// PART 1

console.log("Part 1");
console.log(
  input.reduce((a, b) => {
    a += b[1].filter((el2) => el2.length === 7 || el2.length < 5).length;
    return a;
  }, 0)
);

// PART 2

console.log("Part 2");
console.log(
  input.reduce((a, b) => {
    let numbers = determine(b[0]);
    a += parseInt(
      b[1].reduce((a2, b2) => {
        a2 += getNumber(numbers, b2);
        return a2;
      }, "")
    );
    return a;
  }, 0)
);
function determine(array) {
  array = array.map((el) => el.split(""));
  let segments = ["", "", "", "", "", "", ""];
  let one = array.filter((el) => el.length === 2)[0];
  let four = array.filter((el) => el.length === 4)[0];
  let seven = array.filter((el) => el.length === 3)[0];
  let eight = array.filter((el) => el.length === 7)[0];
  segments[0] = seven.filter((el) => !one.includes(el))[0];

  let nine = array.filter(
    (el) => el.length === 6 && four.every((el2) => el.includes(el2))
  )[0];
  let zero = array.filter(
    (el) =>
      el.length === 6 &&
      one.every((el2) => el.includes(el2)) &&
      !el.every((el2) => nine.includes(el2))
  )[0];
  let six = array.filter(
    (el) =>
      el.length === 6 &&
      !el.every((el2) => nine.includes(el2)) &&
      !el.every((el2) => zero.includes(el2))
  )[0];

  segments[2] = eight.filter((el) => !six.includes(el))[0];
  let five = nine.filter((el) => el !== segments[2]);
  segments[3] = eight.filter((el) => !zero.includes(el))[0];
  segments[4] = eight.filter((el) => !nine.includes(el))[0];
  segments[5] = one.filter((el) => el !== segments[2])[0];

  segments[6] = nine.filter((el) => ![...four, segments[0]].includes(el))[0];
  segments[1] = eight.filter((el) => !segments.includes(el))[0];

  let two = array.filter(
    (el) =>
      el.length == 5 &&
      [segments[0], segments[2], segments[3], segments[4], segments[6]].every(
        (el2) => el.includes(el2)
      )
  )[0];
  let three = array.filter(
    (el) =>
      el.length == 5 &&
      [segments[0], segments[2], segments[3], segments[5], segments[6]].every(
        (el2) => el.includes(el2)
      )
  )[0];
  let numbers = [zero, one, two, three, four, five, six, seven, eight, nine];
  return numbers;
}

function getNumber(numbers, number) {
  numbers = numbers.map((el, index) => {
    return { numbers: el, index: index };
  });
  return numbers.filter(
    (el) =>
      el.numbers.length === number.length &&
      number.split("").every((el2) => el.numbers.includes(el2))
  )[0].index;
}