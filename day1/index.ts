// https://adventofcode.com/2019/day/1
import _ from "lodash";
import fs from "fs";

function getFuel(mass: number): number {
  return _.floor(mass / 3) - 2;
}

console.log("12 -> 2, ", getFuel(12));
console.log("14 -> 2, ", getFuel(14));
console.log("1969 -> 654,  ", getFuel(1969));
console.log("100756 -> 33583, ", getFuel(100756));

const input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n")
  .map(_.toNumber);

// Part 1
const output1 = input
  .map(getFuel)
  .reduce((prevValue, currentValue) => prevValue + currentValue, 0);

console.log("expect part 1 output: 3295424", output1);

// Part 2
const moduleFuels = input.map(mass => {
  let total = 0;
  let currentMass = getFuel(mass);
  while (currentMass > 0) {
    total += currentMass;
    currentMass = getFuel(currentMass);
  }
  return total;
});

const output2 = moduleFuels.reduce(
  (prevValue, currentValue) => prevValue + currentValue,
  0
);

console.log("expect output2: 4940279", output2);
