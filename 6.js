let data = require("./6input.js");
let start = data.data.split(",").map((el) => parseInt(el));

// PART 1

function dayChange(array) {
  let endOfArray = [];
  array = array.map((el) => {
    if (el === 0) {
      endOfArray.push(8);
      return 6;
    } else {
      return el - 1;
    }
  });
  return array.concat(endOfArray);
}

let final = start;
for (let i = 0; i < 80; i++) {
  final = dayChange(final);
}

console.log("PART 1");
console.log(final.length);

// PART 2

let initialArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
start.forEach((el) => {
  initialArray[el]++;
});

for (let i = 0; i < 256; i++) {
  initialArray = changeDay(initialArray);
}


function changeDay(inputArray) {
  let tempArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 1; i < 7; i++) {
    tempArray[i - 1] = inputArray[i];
  }
  tempArray[6] = inputArray[0] + inputArray[7];
  tempArray[7] = inputArray[8];
  tempArray[8] = inputArray[0];
  return tempArray;
}
console.log("PART 2");
let count=0;
initialArray.forEach(el=>{
    count+=el
})

console.log(count);
