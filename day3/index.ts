// https://adventofcode.com/2019/day/3

// R75,D30,R83,U83,L12,D49,R71,U7,L72
// U62,R66,U55,R34,D71,R55,D58,R83 = distance 159

// R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
// U98,R91,D20,R16,D67,R40,U7,R15,U6,R7 = distance 135

// 2 wires: one wire per line (2 path)

// direction + num of steps
// R: x + n, y
// U: x, y + n
// L: x - n, y
// D; x, y - n

// starts at [1, 1]
// R8,U5,L5,D3
// path-1 set: [[1, 1], [9, 1], [9, 6], [4, 6], [4, 3]]
// edge: {x: 1-9, y: 1} {x: 9, y: 1-6} {x: 4-9, y: 6} {x: 4, y: 3-6}
// U7,R6,D4,L4
// path-2 set: [[1, 1], [1, 8], [6, 8], [6, 5], [4, 5]]
// edge: {x: 1, y: 1-8} {x: 1-6, y: 8} {x: 6, y: 5-8} {x: 4-6, y: 5}

// cross: [6, 6] [4, 5]
// closer: [4, 5] distence 3 + 3 = 6

// node {x: 1, y: 1, edges: [{x: 2, y: 1}, {}]}
// node {x: 2, y: 1}
// nodes: {
// '1,1': {edges: ['1,2', '2,1'], isCross: false},
// '1,2': {edges: ['1,1', '1,3'], isCross: false}
// }

import fs from "fs";

const wires = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");
const wire1 = wires[0];
const wire2 = wires[1];

const testWire1_1 = "R8,U5,L5,D3";
const testWire1_2 = "U7,R6,D4,L4";

const testWire2_1 = "R75,D30,R83,U83,L12,D49,R71,U7,L72";
const testWire2_2 = "U62,R66,U55,R34,D71,R55,D58,R83";

const testWire3_1 = "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51";
const testWire3_2 = "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7";

function getResult(test1: string[], test2: string[]): number {
  const start = "1,1";
  const nodes = new Set<string>();
  const crossNodes = new Set<string>();
  let current = start;
  let distance = -1;

  test1.map((w) => {
    const direction = w[0];
    const n = parseInt(w.slice(1), 0);

    for (let i = 0; i < n; i++) {
      // add nodes and edge
      nodes.add(current);
      current = move(current, direction, 1);
    }
  });

  // reset start
  current = start;
  test2.map((w) => {
    const direction = w[0];
    const n = parseInt(w.slice(1), 0);

    for (let i = 0; i < n; i++) {
      if (nodes.has(current) && current !== start) {
        crossNodes.add(current);
        const x = Math.abs(parseInt(current.split(",")[0], 0)) - 1;
        const y = Math.abs(parseInt(current.split(",")[1], 0)) - 1;
        const currentDistance = x + y;
        if (distance === -1 || distance > currentDistance) {
          distance = currentDistance;
        }
      }
      current = move(current, direction, 1);
    }
  });

  return distance;
}

function move(location: string, direction: string, n: number): string {
  const x = parseInt(location.split(",")[0], 0);
  const y = parseInt(location.split(",")[1], 0);
  switch (direction) {
    case "L": {
      return `${x - n},${y}`;
    }
    case "R": {
      return `${x + n},${y}`;
    }
    case "U": {
      return `${x},${y + n}`;
    }
    case "D": {
      return `${x},${y - n}`;
    }
    default: {
      return "";
    }
  }
}

console.log("============");
console.log(testWire1_1);
console.log(
  `${testWire1_2} = distance 6 `,
  getResult(testWire1_1.split(","), testWire1_2.split(","))
);

console.log("============");
console.log(testWire2_1);
console.log(
  `${testWire2_2} = distance 159 `,
  getResult(testWire2_1.split(","), testWire2_2.split(","))
);

console.log("============");
console.log(testWire3_1);
console.log(
  `${testWire3_2} = distance 135 `,
  getResult(testWire3_1.split(","), testWire3_2.split(","))
);

console.log("============");
console.log(getResult(wire1.split(","), wire2.split(",")));
