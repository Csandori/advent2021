let data = require("./12input.js");
let input = data.data.split(/[\r\n]/gm).map((el) => el.trim().split("-"));

let system = input.reduce((a, b) => {
  if (b[0] in a) {
    a[b[0]].push(b[1]);
  } else {
    a[b[0]] = [b[1]];
  }
  if (b[1] in a) {
    a[b[1]].push(b[0]);
  } else {
    a[b[1]] = [b[0]];
  }
  return a;
}, {});

let partOne = () => {
  return partOneMain(["start"], []).length;
  function partOneMain(route, routes) {
    let position = route[route.length - 1];
    system[position].forEach((direction) => {
      if (
        !(direction.toLowerCase() === direction && route.includes(direction)) &&
        direction !== "start"
      ) {
        if (direction === "end") {
          routes.push([...route, direction]);
        } else {
          partOneMain([...route, direction], routes);
        }
      }
    });
    return routes;
  }
};

let partTwo = () => {
  return partTwoMain(["start"], [], false).length;
  function partTwoMain(route, routes, visitedTwice) {
    let position = route[route.length - 1];
    system[position].forEach((direction) => {
      if (direction !== "start") {
        if (direction === "end") {
          routes.push([...route, direction]);
        } else if (
          direction.toLowerCase() === direction &&
          route.includes(direction) &&
          !visitedTwice
        ) {
          partTwoMain([...route, direction], routes, true);
        } else if (
          direction.toLowerCase() !== direction ||
          (direction.toLowerCase() === direction && !route.includes(direction))
        ) {
          partTwoMain([...route, direction], routes, visitedTwice || false);
        }
      }
    });
    return routes;
  }
};
console.log(partOne());
console.log(partTwo());
