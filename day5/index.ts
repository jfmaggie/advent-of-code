// https://adventofcode.com/2019/day/5

import fs from "fs";
import readlineSync from "readline-sync";
import toNumber from "lodash/toNumber";

const OFFSET_4 = 4;
const OFFSET_3 = 3;
const OFFSET_2 = 2;
const HALT_CODE = 99;

class Program {
  instructions: Map<number, number>;
  pointer: number = 0;

  constructor(numbers: number[]) {
    this.instructions = new Map();
    numbers.forEach((num, idx) => {
      this.instructions.set(idx, num);
    });
  }

  run() {
    while (this.pointer < this.instructions.size) {
      this.readInstruction(this.instructions.get(this.pointer)!);
    }
  }

  readInstruction(instruction: number) {
    let code = instruction.toString();
    if (code.length < 5) {
      const numOfZeroToPrepend = 5 - code.length;
      for (let i = 0; i < numOfZeroToPrepend; i++) {
        code = "0" + code;
      }
    }

    const opcode = toNumber(code.slice(-2));
    const firstParamMode = toNumber(code.slice(2, 3));
    const secondParamMode = toNumber(code.slice(1, 2));
    const thirdParamMode = toNumber(code.slice(0, 1));

    switch (opcode) {
      case 1: {
        // offset 4
        // this.state.set(p3, value1 + value2);
        const firstParam = this.instructions.get(this.pointer + 1)!;
        const firstValue =
          firstParamMode === 0
            ? this.instructions.get(firstParam)!
            : firstParam;
        const secondParam = this.instructions.get(this.pointer + 2)!;
        const secondValue =
          secondParamMode === 0
            ? this.instructions.get(secondParam)!
            : secondParam;
        const thirdParam = this.instructions.get(this.pointer + 3)!;
        const thirdValue =
          thirdParamMode === 0
            ? thirdParam
            : this.instructions.get(thirdParam)!;
        const result = firstValue + secondValue;
        this.instructions.set(thirdValue, result);
        this.pointer += OFFSET_4;
        break;
      }
      case 2: {
        // offset 4
        // this.state.set(p3, value1 * value2);
        const firstParam = this.instructions.get(this.pointer + 1)!;
        const firstValue =
          firstParamMode === 0
            ? this.instructions.get(firstParam)!
            : firstParam;
        const secondParam = this.instructions.get(this.pointer + 2)!;
        const secondValue =
          secondParamMode === 0
            ? this.instructions.get(secondParam)!
            : secondParam;
        const thirdParam = this.instructions.get(this.pointer + 3)!;
        const thirdValue =
          thirdParamMode === 0
            ? thirdParam
            : this.instructions.get(thirdParam)!;
        const result = firstValue * secondValue;
        this.instructions.set(thirdValue, result);
        this.pointer += OFFSET_4;
        break;
      }
      case 3: {
        // Parameters that an instruction writes to will never be in immediate mode.
        // offset 1 position (new current: current + 1)
        // take input and set to next position
        const input = readlineSync.question("");

        const position = this.instructions.get(this.pointer + OFFSET_2 - 1)!;

        // store this input at position
        this.instructions.set(position, toNumber(input));
        this.pointer += OFFSET_2;
        break;
      }
      case 4: {
        // offset 2 position (new current: current + 2)
        // output its own params at next postion
        const position = this.instructions.get(this.pointer + OFFSET_2 - 1)!;
        const output =
          firstParamMode === 0 ? this.instructions.get(position)! : position;
        // process.stdout.write(output.toString());
        console.log(output);
        this.pointer += OFFSET_2;
        break;
      }
      case 5: {
        // if the first parameter is non-zero,
        // it sets the instruction pointer to the value from the second parameter.
        // Otherwise, it does nothing.
        const firstParam = this.instructions.get(this.pointer + 1)!;
        const firstValue =
          firstParamMode === 0
            ? this.instructions.get(firstParam)!
            : firstParam;
        const secondParam = this.instructions.get(this.pointer + 2)!;
        const secondValue =
          secondParamMode === 0
            ? this.instructions.get(secondParam)!
            : secondParam;
        // console.log("==== firstValue", firstValue);
        // console.log("==== secondValue", secondValue);
        // console.log("==== this.pointer", this.pointer);
        if (firstValue !== 0) {
          this.pointer = secondValue;
        } else {
          this.pointer += OFFSET_3;
        }
        break;
      }
      case 6: {
        // if the first parameter is zero,
        // it sets the instruction pointer to the value from the second parameter.
        // Otherwise, it does nothing.
        const firstParam = this.instructions.get(this.pointer + 1)!;
        const firstValue =
          firstParamMode === 0
            ? this.instructions.get(firstParam)!
            : firstParam;
        const secondParam = this.instructions.get(this.pointer + 2)!;
        const secondValue =
          secondParamMode === 0
            ? this.instructions.get(secondParam)!
            : secondParam;
        if (firstValue === 0) {
          this.pointer = secondValue;
        } else {
          this.pointer += OFFSET_3;
        }
        break;
      }
      case 7: {
        // if the first parameter is less than the second parameter,
        // it stores 1 in the position given by the third parameter.
        // Otherwise, it stores 0.
        const firstParam = this.instructions.get(this.pointer + 1)!;
        const firstValue =
          firstParamMode === 0
            ? this.instructions.get(firstParam)!
            : firstParam;
        const secondParam = this.instructions.get(this.pointer + 2)!;
        const secondValue =
          secondParamMode === 0
            ? this.instructions.get(secondParam)!
            : secondParam;
        const thirdParam = this.instructions.get(this.pointer + 3)!;
        const thirdValue =
          thirdParamMode === 0
            ? thirdParam
            : this.instructions.get(thirdParam)!;
        if (firstValue < secondValue) {
          this.instructions.set(thirdValue, 1);
        } else {
          this.instructions.set(thirdValue, 0);
        }
        this.pointer += OFFSET_4;
        break;
      }
      case 8: {
        // if the first parameter is less than the second parameter,
        // it stores 1 in the position given by the third parameter.
        // Otherwise, it stores 0.
        const firstParam = this.instructions.get(this.pointer + 1)!;
        const firstValue =
          firstParamMode === 0
            ? this.instructions.get(firstParam)!
            : firstParam;
        const secondParam = this.instructions.get(this.pointer + 2)!;
        const secondValue =
          secondParamMode === 0
            ? this.instructions.get(secondParam)!
            : secondParam;
        const thirdParam = this.instructions.get(this.pointer + 3)!;
        const thirdValue =
          thirdParamMode === 0
            ? thirdParam
            : this.instructions.get(thirdParam)!;
        if (firstValue === secondValue) {
          this.instructions.set(thirdValue, 1);
        } else {
          this.instructions.set(thirdValue, 0);
        }
        this.pointer += OFFSET_4;
        break;
      }
      case HALT_CODE: {
        this.pointer = this.instructions.size;
        break;
      }
      default: {
        break;
      }
    }
  }
}

const formattedInput = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split(",")
  .map(toNumber);

// part 1 expected result: 15386262
// 1. start by requesting user input
// 2. perform tests; output instruction the test result (0: successful; non-0: not working)
// 3. output a diagnostic code and halt (get this code)
// const program1 = new Program(formattedInput);
// program1.run();

// part 2 expected result: 10376124
// user input 5
const program2 = new Program(formattedInput);
program2.run();

// const test1 = new Program([
//   3,
//   21,
//   1008,
//   21,
//   8,
//   20,
//   1005,
//   20,
//   22,
//   107,
//   8,
//   21,
//   20,
//   1006,
//   20,
//   31,
//   1106,
//   0,
//   36,
//   98,
//   0,
//   0,
//   1002,
//   21,
//   125,
//   20,
//   4,
//   20,
//   1105,
//   1,
//   46,
//   104,
//   999,
//   1105,
//   1,
//   46,
//   1101,
//   1000,
//   1,
//   20,
//   4,
//   20,
//   1105,
//   1,
//   46,
//   98,
//   99,
// ]);
// test1.run();
