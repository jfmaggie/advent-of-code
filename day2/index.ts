// https://adventofcode.com/2019/day/2

// Here are the initial and final states of a few more small programs:
// 1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2).
// 2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6).
// 2,4,4,5,99,0 becomes 2,4,4,5,99,9801 (99 * 99 = 9801).
// 1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99.

import fs from "fs";
import toNumber from "lodash/toNumber";

const OFFSET = 4;
const HALT_CODE = 99;

interface Program {
  state: Map<number, number>;
  currentPosition: number;
  offset: number;
  haltCode: number;
}

class Program {
  constructor(numbers: number[]) {
    this.currentPosition = 0;
    this.offset = OFFSET;
    this.haltCode = HALT_CODE;

    const numbersMap = new Map();
    numbers.forEach((num: number, index: number) => {
      numbersMap.set(index, num);
    });
    this.state = numbersMap;
  }

  run() {
    while (
      this.state.get(this.currentPosition) !== this.haltCode &&
      this.currentPosition + (this.offset - 1) < this.state.size
    ) {
      this.runCode(
        this.state.get(this.currentPosition)!,
        this.state.get(this.currentPosition + 1)!,
        this.state.get(this.currentPosition + 2)!,
        this.state.get(this.currentPosition + 3)!
      );
      this.currentPosition += this.offset;
    }
    return this.state.values();
  }

  getState() {
    return this.state;
  }

  runCode(code: number, p1: number, p2: number, p3: number) {
    if ([code, p1, p2, p3].some((val) => val == undefined)) {
      return;
    }

    const value1 = this.state.get(p1);
    const value2 = this.state.get(p2);

    if (value1 == undefined || value2 == undefined) {
      return;
    }

    switch (code) {
      case 1:
        this.state.set(p3, value1 + value2);
        break;
      case 2:
        this.state.set(p3, value1 * value2);
        break;
      case HALT_CODE:
        break;
      default:
        break;
    }
  }

  replaceState(position: number, value: number) {
    this.state.set(position, value);
  }
}

console.log(
  "1,0,0,0,99 becomes 2,0,0,0,99\n",
  new Program([1, 0, 0, 0, 99]).run(),
  "\n"
);
console.log(
  "2,3,0,3,99 becomes 2,3,0,6,99\n",
  new Program([2, 3, 0, 3, 99]).run(),
  "\n"
);
console.log(
  "2,4,4,5,99,0 becomes 2,4,4,5,99,9801\n",
  new Program([2, 4, 4, 5, 99, 0]).run(),
  "\n"
);
console.log(
  "1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99\n",
  new Program([1, 1, 1, 4, 99, 5, 6, 0, 99]).run(),
  "\n"
);

// Part 1
const formattedInput = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split(",")
  .map(toNumber);

const program1 = new Program(formattedInput);
const noun1 = 12,
  verb1 = 2,
  result1 = 3716293;
program1.replaceState(1, noun1);
program1.replaceState(2, verb1);
program1.run();

console.log(
  `==== Final state at position 0: ${result1}\n`,
  program1.getState().get(0),
  "\n"
);

// Part 2
// noun: 0-99
// verb: 0-99
let noun2, verb2;

for (let noun = 0; noun < 100; noun++) {
  for (let verb = 0; verb < 100; verb++) {
    const program = new Program(formattedInput);
    program.replaceState(1, noun);
    program.replaceState(2, verb);
    program.run();
    const result = program.getState().get(0);
    if (result === 19690720) {
      noun2 = noun;
      verb2 = verb;
    }
  }
}
console.log("==== noun2: ", noun2, "\n");
console.log("==== verb2: ", verb2, "\n");
console.log(
  "==== 100 * noun + verb = (expected 6429)",
  (noun2 as number) * 100 + (verb2 as number)
);
