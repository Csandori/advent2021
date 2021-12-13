let data = require("./13input.js");
let input = data.data.split(/[\r\n]/gm).map((el) => el.trim());
input = input.reduce(
  (a, b) => {
    if (b.includes("fold")) {
      a["folds"].push({
        value: parseInt(b.split("=")[1]),
        along: b.split("along ")[1].split("=")[0],
      });
    } else if (b !== "") {
      a.dots.push(b.split(",").map(Number));
    }
    return a;
  },
  { dots: [], folds: [] }
);

let partOne = () => {
  return main(input, 0);

  function main(input, foldValue) {
    if (foldValue == input.folds.length) {
      return input.dots;
    }
    input.dots = Object.keys(
      fold(
        input.dots,
        input.folds[foldValue].along === "x" ? 0 : 1,
        input.folds[foldValue].value
      )
    )
      .map((el) => el.split(",").map(Number))
      .sort((a, b) => a[0] - b[0]);
    if (foldValue === 0) {
      console.log(input.dots.length);
    }
    return main(input, foldValue + 1);
  }
  function fold(array, fold, position) {
    return array.reduce((a, b) => {
      if (b[fold] > position) {
        b[fold] = position * 2 - b[fold];
        if (b in a) {
          a[b]++;
        } else {
          a[b] = 1;
        }
      } else if (b[fold] < position) {
        if (b in a) {
          a[b]++;
        } else {
          a[b] = 1;
        }
      }
      return a;
    }, {});
  }
};

let partTwo = () => {
  let array = partOne();
  let height = Math.max(...array.map((el) => el[1]));
  let width = Math.max(...array.map((el) => el[0]));
  let visualize = Array(height + 1);
  visualize.fill([], 0, height + 1);
  visualize = visualize.map((el) => {
    el = Array(width + 1);
    el.fill(" ", 0, width + 1);
    return el;
  });
  array.forEach((el) => {
    visualize[el[1]][el[0]] = "O";
  });
  return visualize.map((el) => el.join("")).join("\n");
};
console.log(partTwo());
