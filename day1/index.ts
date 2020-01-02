// https://adventofcode.com/2019/day/1
import _ from "lodash";
import fs from "fs";

function getFuel(mass: number): number {
  return _.floor(mass / 3) - 2;
}

console.log("==== getFuel: ");
console.log("12 -> 2, ", getFuel(12));
console.log("14 -> 2, ", getFuel(14));
console.log("1969 -> 654, ", getFuel(1969));
console.log("100756 -> 33583, ", getFuel(100756));
console.log("\n");

function getTotalFuel(mass: number): number {
  let total = 0;
  let currentMass = getFuel(mass);
  while (currentMass > 0) {
    total += currentMass;
    currentMass = getFuel(currentMass);
  }
  return total;
}

console.log("==== getTotalFuel: ");
console.log("14 -> 2, ", getTotalFuel(14));
console.log("1969 -> 966, ", getTotalFuel(1969));
console.log("100756 -> 50346, ", getTotalFuel(100756));
console.log("\n");

const input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n")
  .map(_.toNumber);

// Part 1
const output1 = _.chain(input)
  .map(getFuel)
  .sum()
  .value();

console.log("expect part 1 output: 3295424, ", output1);

// Part 2
const output2 = _.chain(input)
  .map(getTotalFuel)
  .sum()
  .value();

console.log("expect output2: 4940279, ", output2);
