let data = require("./2input.js");
let lines = data.data.split(/[\r\n]/gm);

// PART 1

let position = [0, 0];
for (let i = 0; i < lines.length; i++) {
  let elements = lines[i].trim().split(" ");
  switch (elements[0]) {
    case "forward":
      position[0] += parseInt(elements[1]);
      break;
    case "down":
      position[1] += parseInt(elements[1]);
      break;
    case "up":
      position[1] -= parseInt(elements[1]);
      break;
  }
}
console.log(position);
console.log(position[0] * position[1]);

// PART 2

position = [0, 0, 0];
for (let i = 0; i < lines.length; i++) {
  let elements = lines[i].trim().split(" ");
  switch (elements[0]) {
    case "forward":
      position[0] += parseInt(elements[1]);
      position[1] += parseInt(elements[1]) * position[2];
      break;
    case "down":
      position[2] += parseInt(elements[1]);
      break;
    case "up":
      position[2] -= parseInt(elements[1]);
      break;
  }
}
console.log(position);
console.log(position[0] * position[1]);

// IF nélkül

let object = {
  forward: (value) => {
    object.horizontal += parseInt(value);
    object.vertical += parseInt(value) * object.aim;
  },
  up: (value) => {
    object.aim -= parseInt(value);
  },
  down: (value) => {
    object.aim += parseInt(value);
  },
  horizontal: 0,
  vertical: 0,
  aim: 0,
};
for (let i = 0; i < lines.length; i++) {
  let elements = lines[i].trim().split(" ");
  object[elements[0]](elements[1]);
}
console.log(object);
console.log(position);
