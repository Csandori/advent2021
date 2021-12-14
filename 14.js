let data = require("./14input.js");
let input = data.data.split(/[\r\n]/gm).map((el) => el.trim());
input = input.reduce(
  (a, b) => {
    if (b.includes("->")) {
      a["pairs"].push(b.split(" -> "));
    } else if (b !== "") {
      a["template"] = b;
    }
    return a;
  },
  { template: "", pairs: [] }
);

let partOne = (step) => {
  let sequence = main(input.template, step);
  let arrayPairs = sequence.split("").reduce((a, b) => {
    let index = a.findIndex((el) => el[0] === b);
    if (a[index]) {
      a[index][1]++;
    } else {
      a.push([b, 1]);
    }
    return a;
  }, []);
  return (
    arrayPairs.reduce(
      (a, b) => {
        if (b[1] > a[1]) {
          a = b;
        }
        return a;
      },
      ["", 0]
    )[1] -
    arrayPairs.reduce(
      (a, b) => {
        if (b[1] < a[1]) {
          a = b;
        }
        return a;
      },
      ["", 100000]
    )[1]
  );
  function main(template, step) {
    let result = "";
    for (let i = 0; i < template.length - 1; i++) {
      result +=
        template[i] +
        input.pairs.find((el) => el[0] == template.substring(i, i + 2))[1];
    }
    result += template[template.length - 1];
    if (step > 1) {
      return main(result, step - 1);
    }
    return result;
  }
};

let partTwo = (step) => {
  let newRule = input.pairs.reduce((a, b) => {
    a[b[0]] = [b[0][0] + b[1], b[1] + b[0][1]];
    return a;
  }, {});
  let base = input.pairs
    .map((el) => el[0])
    .reduce((a, b) => {
      a[b] = 0;
      return a;
    }, {});
  let start = JSON.parse(JSON.stringify(base));
  Object.keys(start).forEach((el) => {
    start[el] = [...input.template.matchAll(new RegExp(el, "g"))].length;
  });
  let endObject = {};
  let result = main(start, step);
  Object.keys(result).forEach((el) => {
    el.split("").forEach((el1) => {
      if (el1 in endObject) {
        endObject[el1] += result[el];
      } else {
        endObject[el1] = result[el];
      }
    });
  });
  endObject[input.template[0]]++;
  endObject[input.template[input.template.length - 1]]++;
  let values = Object.values(endObject).sort((a, b) => b - a);
  return (values[0] - values[values.length - 1]) / 2;
  function main(storage, step) {
    let baseCopy = JSON.parse(JSON.stringify(base));
    Object.keys(storage).forEach((el) => {
      newRule[el].forEach((el2) => {
        baseCopy[el2] += storage[el];
      });
    });
    if (step > 1) {
      return main(baseCopy, step - 1);
    }
    return baseCopy;
  }
};

console.log(partOne(10));
console.log(partTwo(40));
