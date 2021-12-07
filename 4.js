let data = require("./4input.js");
let lines = data.data.split(/[\r\n]/gm).map((el) => el.trim());
let draws = lines[0].split(",").map((el) => parseInt(el));

let boards = [];
for (let i = 1; i < lines.length; i++) {
  if (lines[i] == "") {
    boards.push([]);
  } else {
    boards[boards.length - 1].push(lines[i]);
  }
}
boards = boards.map((el) =>
  el.map((el2) => {
    return el2.split(/\s\s+|\s/g).map((el3) => {
      return { value: parseInt(el3), marked: false };
    });
  })
);

let boardsFor2 = JSON.parse(JSON.stringify(boards));
// PART 1

let won = false;
for (let i = 0; i < draws.length && !won; i++) {
  won = draw(draws[i]);
}
function draw(value) {
  let win = false;
  let logged = false;
  for (let i = 0; i < boards.length; i++) {
    calculate(boards[i], value);
    checkIfWinner(boards[i]) ? (win = true) : "";
    if (win && !logged) {
      let sum = boards[i].reduce((a, b) => {
        a += b.reduce((a2, b2) => {
          b2.marked ? "" : (a2 += b2.value);
          return a2;
        }, 0);
        return a;
      }, 0);
      logged = true;
      console.log(sum * value);
    }
  }
  return win;
}
function calculate(board, value) {
  board.forEach((el) => {
    el.forEach((el2) => {
      if (el2.value === value) {
        el2.marked = true;
      }
    });
  });
}
function checkIfWinner(board) {
  let isThereHWinner = false;
  let isThereVWinner = false;
  board.forEach((line, i) => {
    if (line.every((el) => el.marked)) {
      isThereHWinner = true;
    }
  });
  // rotate
  let rotated = board.reduce(
    (a, b) => {
      for (let i = 0; i < b.length; i++) {
        a[i].push(b[i]);
      }
      return a;
    },
    [[], [], [], [], []]
  );
  rotated.forEach((line, i) => {
    if (line.every((el) => el.marked)) {
      isThereVWinner = true;
    }
  });
  return isThereHWinner || isThereVWinner;
}

// PART 2

won = false;
for (let i = 0; i < draws.length && !won; i++) {
  won = draw2(draws[i]);
}
function draw2(value) {
  let win = false;
  let stop = false;
  let logged = false;
  let tempBoards = [];
  for (let i = 0; i < boardsFor2.length; i++) {
    calculate(boardsFor2[i], value);
    checkIfWinner(boardsFor2[i]) ? (win = true) : "";
    if (!checkIfWinner(boardsFor2[i])) {
      tempBoards.push(boardsFor2[i]);
    }
    if (stop && !logged) {
      winnerWrite(boardsFor2[i], value);
      logged = true;
    }
  }
  if (tempBoards.length === 0) {
    stop = true;
    winnerWrite(boardsFor2[0], value);
  }
  boardsFor2 = tempBoards;
  return stop;
}

function winnerWrite(board, value) {
  let sum = board.reduce((a, b) => {
    a += b.reduce((a2, b2) => {
      b2.marked ? "" : (a2 += b2.value);
      return a2;
    }, 0);
    return a;
  }, 0);
  console.log(sum * value);
}
