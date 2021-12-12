let data = require("./10input.js");
let input = data.data.split(/[\r\n]/gm).map((el) => el.trim());

// Part 1

console.log(
  input
    .reduce((a, b) => {
      part1Function(b).value !== -1 ? a.push(part1Function(b).char) : "";
      return a;
    }, [])
    .reduce((a, b) => {
      switch (b) {
        case ")":
          a += 3;
          break;
        case "}":
          a += 1197;
          break;
        case ">":
          a += 25137;
          break;
        case "]":
          a += 57;
          break;
      }
      return a;
    }, 0)
);
function part1Function(string) {
  let initial = string;
  string = string.replace(/\<\>/g, "");
  string = string.replace(/\[\]/g, "");
  string = string.replace(/\(\)/g, "");
  string = string.replace(/\{\}/g, "");
  if (string === initial) {
    let array = [
      { value: string.indexOf(")"), char: ")" },
      { value: string.indexOf("]"), char: "]" },
      { value: string.indexOf("}"), char: "}" },
      { value: string.indexOf(">"), char: ">" },
    ];
    return array.reduce(
      (a, b) => {
        if (b.value !== -1) {
          if (b.value < a.value || a.value == -1) {
            a = b;
          }
        }
        return a;
      },
      { value: -1 }
    );
  } else {
    return part1Function(string);
  }
}

// PART 2

let part2Array = [];
input
  .filter((el) => part1Function(el).value == -1)
  .forEach((el2) => {
    let array = part2Function(el2).split("");
    let value = 0;
    array.forEach((el, index) => {
      value *= 5;
      switch (el) {
        case ")":
          value += 1;
          break;
        case "}":
          value += 3;
          break;
        case ">":
          value += 4;
          break;
        case "]":
          value += 2;
          break;
      }
    });
    part2Array.push(value);
  });
console.log(part2Array.sort((a,b)=>a-b)[(part2Array.length - 1) / 2]);
function part2Function(string) {
  let initial = string;
  string = string.replace(/\<\>/g, "");
  string = string.replace(/\[\]/g, "");
  string = string.replace(/\(\)/g, "");
  string = string.replace(/\{\}/g, "");
  if (string === initial) {
    let storage = [0, 0, 0, 0];
    return string
      .split("")
      .reverse()
      .reduce((a, b) => {
        switch (b) {
          case "(":
            if (storage[0]) {
              storage[0]--;
            } else {
              a += ")";
            }
            break;
          case "[":
            if (storage[1]) {
              storage[1]--;
            } else {
              a += "]";
            }
            break;
          case "{":
            if (storage[2]) {
              storage[2]--;
            } else {
              a += "}";
            }
            break;
          case "<":
            if (storage[3]) {
              storage[3]--;
            } else {
              a += ">";
            }
            break;
          case ")":
            storage[0]++;
            break;
          case "]":
            storage[1]++;
            break;
          case "}":
            storage[2]++;
            break;
          case ">":
            storage[3]++;
            break;
        }
        return a;
      }, "");
  } else {
    return part2Function(string);
  }
}
