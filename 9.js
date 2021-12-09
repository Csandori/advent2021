let data = require("./9input.js");
let input = data.data
  .split(/[\r\n]/gm)
  .map((el) => el.trim().split("").map(Number));

// Part 1

let bases = [];
let count = 0;
for (let line = 0; line < input.length; line++) {
  for (let column = 0; column < input[line].length; column++) {
    let element = input[line][column];

    if (
      (line === 0
        ? true
        : input[line - 1][column] === undefined ||
          input[line - 1][column] > element) &&
      (column === 0
        ? true
        : input[line][column - 1] === undefined ||
          input[line][column - 1] > element) &&
      (line === input.length - 1
        ? true
        : input[line + 1][column] === undefined ||
          input[line + 1][column] > element) &&
      (column === input[line].length - 1
        ? true
        : input[line][column + 1] === undefined ||
          input[line][column + 1] > element)
    ) {
      bases.push({ line: line, column: column, value: element });
      count += element + 1;
    }
  }
}
console.log(count);

// Part 2

let answer = bases
.reduce((a, b) => {
    a.push(getBasins([b.line, b.column], [[b.line, b.column]]).length);
    return a;
}, [])
.sort((a, b) => b - a);
console.log(answer[0]*answer[1]*answer[2]);

function getBasins(start, array) {
  let line = start[0];
  let column = start[1];

  if (
    !(
      line === 0 ||
      doesItContain([line - 1, column]) ||
      input[line - 1][column] == 9
    )
  ) {
    array.push([line - 1, column]);
    getBasins([line - 1, column], array);
  }

  if (
    !(
      line === input.length - 1 ||
      doesItContain([line + 1, column]) ||
      input[line + 1][column] == 9
    )
  ) {
    array.push([line + 1, column]);
    getBasins([line + 1, column], array);
  }

  if (
    !(
      column === 0 ||
      doesItContain([line, column - 1]) ||
      input[line][column - 1] == 9
    )
  ) {
    array.push([line, column - 1]);
    getBasins([line, column - 1], array);
  }

  if (
    !(
      column === input[line].length - 1 ||
      doesItContain([line, column + 1]) ||
      input[line][column + 1] == 9
    )
  ) {
    array.push([line, column + 1]);
    getBasins([line, column + 1], array);
  }
  return array;
  function doesItContain(val) {
    return array.some((el) => el[0] === val[0] && el[1] === val[1]);
  }
}
