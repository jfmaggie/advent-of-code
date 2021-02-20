// 356261-846303
function main() {
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
  main()
);
