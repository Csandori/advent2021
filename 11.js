let data = require("./11input.js");
let input = data.data
  .split(/[\r\n]/gm)
  .map((el) => el.trim().split("").map(Number));

let partOne = () => {
  let flashCount = 0;
  part1Main(input, 100);
  console.log(flashCount);
  function part1Main(data, steps) {
    let flashes = [];
    let newArray = data.map((el1, index1) =>
      el1.map((el2, index2) => {
        if (el2 === 9) {
          flashes.push({ line: index1, column: index2, increased: false });
        }
        return el2 + 1;
      })
    );
    newArray = increaseByFlashes(newArray, flashes);
    //writeArray(newArray);
    if (steps > 1) {
      part1Main(newArray, steps - 1);
    }
    return newArray;

    function increaseByFlashes(array, fleshArray) {
      let index = fleshArray.findIndex((el) => !el.increased);
      if (index === -1) {
        array.forEach(
          (el1) => (flashCount += el1.filter((el2) => el2 > 9).length)
        );
        return array.map((el1) => el1.map((el2) => (el2 > 9 ? 0 : el2)));
      }
      let element = fleshArray[index];
      let line = element.line;
      let column = element.column;
      let adjacents = [
        [line - 1, column - 1],
        [line - 1, column],
        [line - 1, column + 1],
        [line, column - 1],
        [line, column + 1],
        [line + 1, column - 1],
        [line + 1, column],
        [line + 1, column + 1],
      ];
      adjacents.forEach((el) => {
        if (el[0] < 0 || el[0] > 9 || el[1] < 0 || el[1] > 9) {
        } else {
          array[el[0]][el[1]]++;
          if (
            array[el[0]][el[1]] == 10 &&
            !fleshArray.some((a) => a[0] !== el[0] && a[1] == el[1])
          ) {
            fleshArray.push({ line: el[0], column: el[1], increased: false });
          }
        }
      });
      fleshArray[index].increased = true;
      return increaseByFlashes(array, fleshArray);
    }
  }
};

partOne();

partTwo = () => {
  let stepsHappened = 1;
  let flashCount = 0;
  let tempFlashCount = 0;
  let dataMain=[]
  part1Main(input, 1000);
  return dataMain[0]
  function part1Main(data, steps) {
    let flashes = [];
    let newArray = data.map((el1, index1) =>
      el1.map((el2, index2) => {
        if (el2 === 9) {
          flashes.push({ line: index1, column: index2, increased: false });
        }
        return el2 + 1;
      })
    );
    tempFlashCount = flashCount;
    newArray = increaseByFlashes(newArray, flashes);
    if (flashCount - tempFlashCount == 100) {
      dataMain.push(stepsHappened)
    }
    //writeArray(newArray);
    if (steps > 1) {
      stepsHappened++;
      part1Main(newArray, steps - 1);
    }
    return newArray;

    function increaseByFlashes(array, fleshArray) {
      let index = fleshArray.findIndex((el) => !el.increased);
      if (index === -1) {
        array.forEach(
          (el1) => (flashCount += el1.filter((el2) => el2 > 9).length)
        );
        return array.map((el1) => el1.map((el2) => (el2 > 9 ? 0 : el2)));
      }
      let element = fleshArray[index];
      let line = element.line;
      let column = element.column;
      let adjacents = [
        [line - 1, column - 1],
        [line - 1, column],
        [line - 1, column + 1],
        [line, column - 1],
        [line, column + 1],
        [line + 1, column - 1],
        [line + 1, column],
        [line + 1, column + 1],
      ];
      adjacents.forEach((el) => {
        if (el[0] < 0 || el[0] > 9 || el[1] < 0 || el[1] > 9) {
        } else {
          array[el[0]][el[1]]++;
          if (
            array[el[0]][el[1]] == 10 &&
            !fleshArray.some((a) => a[0] !== el[0] && a[1] == el[1])
          ) {
            fleshArray.push({ line: el[0], column: el[1], increased: false });
          }
        }
      });
      fleshArray[index].increased = true;
      return increaseByFlashes(array, fleshArray);
    }
  }
};
console.log(partTwo());
