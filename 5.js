let data = require("./5input.js");
let lines = data.data.split(/[\r\n]/gm).map((el) => el.trim());
let values = lines.map((el) => {
  let points = el.split(" -> ");
  let object = {
    a: points[0].split(",").map((el) => parseInt(el)),
    b: points[1].split(",").map((el) => parseInt(el)),
  };
  object.iranyvektor = [
    object.b[1] - object.a[1],
    (object.b[0] - object.a[0]) * -1,

    object.a[0] * (object.b[1] - object.a[1]) -
      object.a[1] * (object.b[0] - object.a[0]),
  ];
  return object;
});

// PART 1

let occupiedZone = {};

for (let i = 0; i < values.length; i++) {
  if (values[i].a[0] == values[i].b[0] || values[i].a[1] == values[i].b[1]) {
    base(values[i]).forEach((el) => {
      if (el in occupiedZone) {
        occupiedZone[el]++;
      } else {
        occupiedZone[el] = 1;
      }
    });
  }
}
console.log(Object.values(occupiedZone).filter((el) => el > 1).length);

// PART 2

let occupiedZone2 = {};
for (let i = 0; i < values.length; i++) {
    base(values[i]).forEach((el) => {
        if (el in occupiedZone2) {
            occupiedZone2[el]++;
        } else {
            occupiedZone2[el] = 1;
        }
    });
}
console.log(Object.values(occupiedZone2).filter((el) => el > 1).length);

function base(value) {
  let occupied = [value.a];
  let temp = value.a;
  let to = value.b;
  while (!(temp[0] === to[0] && temp[1] === to[1])) {
    temp = step(temp, value.b, value.iranyvektor);
    occupied.push(temp);
  }
  return occupied;
}

function step(from, to, iranyvektor) {
  let newPoint = [0, 0];
  if (from[0] < to[0]) {
    newPoint[0] = from[0] + 1;
    newPoint[1] =
      (iranyvektor[2] - newPoint[0] * iranyvektor[0]) / iranyvektor[1];
  } else if (from[0] > to[0]) {
    newPoint[0] = from[0] - 1;
    newPoint[1] =
      (iranyvektor[2] - newPoint[0] * iranyvektor[0]) / iranyvektor[1];
  } else if (from[1] > to[1]) {
    newPoint[1] = from[1] - 1;
    newPoint[0] =
      (iranyvektor[2] - newPoint[1] * iranyvektor[1]) / iranyvektor[0];
  } else if (from[1] < to[1]) {
    newPoint[1] = from[1] + 1;
    newPoint[0] =
      (iranyvektor[2] - newPoint[1] * iranyvektor[1]) / iranyvektor[0];
  }
  return newPoint;
}
