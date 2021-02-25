// https://adventofcode.com/2019/day/4

// 356261-846303
function part1() {
  let result = 0;
  for (let i = 356261; i < 846303; i++) {
    if (isIncreasingAndSameTwoAdjacent(i)) {
      result++;
    }
  }
  return result;
}

function isIncreasingAndSameTwoAdjacent(n: number): boolean {
  const numAsArray = n
    .toString()
    .split("")
    .map((n) => parseInt(n, 0));

  let isIncreasing = true;
  let isSameTwoAdjacent = false;
  numAsArray.reduce((prev, curr) => {
    if (curr > prev) {
      return curr;
    }
    if (curr === prev) {
      isSameTwoAdjacent = true;
      return curr;
    }
    if (curr < prev) {
      isIncreasing = false;
    }
    return prev;
  }, -1);

  return isIncreasing && isSameTwoAdjacent;
}

// part 1
console.log(
  "111111 meets these criteria (double 11, never decreases). ",
  isIncreasingAndSameTwoAdjacent(111111)
);
console.log(
  "223450 does not meet these criteria (decreasing pair of digits 50)",
  isIncreasingAndSameTwoAdjacent(223450)
);
console.log(
  "123789 does not meet these criteria (no double). ",
  isIncreasingAndSameTwoAdjacent(123789)
);

console.log(
  "=== How many different passwords within the range given in your puzzle input meet these criteria?",
  part1()
);

console.log("=========================");

function isIncreasingAndSameTwoAdjacentNotPartOfGroup(n: number): boolean {
  const numAsArray = n
    .toString()
    .split("")
    .map((n) => parseInt(n, 0));

  let isSameTwoAdjacent = false;
  let repeatCount = 1;
  let lastNum = -1;

  for (const num of numAsArray) {
    if (num < lastNum) {
      return false;
    }
    if (num === lastNum) {
      repeatCount++;
    }
    if (num > lastNum) {
      if (repeatCount === 2) {
        isSameTwoAdjacent = true;
      }
      repeatCount = 1;
    }
    lastNum = num;
  }

  if (repeatCount === 2) {
    isSameTwoAdjacent = true;
  }

  return isSameTwoAdjacent;
}

function part2() {
  let result = 0;
  for (let i = 356261; i < 846303; i++) {
    if (isIncreasingAndSameTwoAdjacentNotPartOfGroup(i)) {
      result++;
    }
  }
  return result;
}

// part 2
console.log(
  "112233 meets these criteria because the digits never decrease and all repeated digits are exactly two digits long. ",
  isIncreasingAndSameTwoAdjacentNotPartOfGroup(112233)
);
console.log(
  "123444 no longer meets the criteria (the repeated 44 is part of a larger group of 444). ",
  isIncreasingAndSameTwoAdjacentNotPartOfGroup(123444)
);
console.log(
  "111122 meets the criteria (even though 1 is repeated more than twice, it still contains a double 22). ",
  isIncreasingAndSameTwoAdjacentNotPartOfGroup(111122)
);

console.log("=== part 2", part2());
