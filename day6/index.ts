// https://adventofcode.com/2019/day/6

import fs from "fs";

const nodes = new Set<string>();
const edges = {} as {
  [key: string]: string[];
};

fs.readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n")
  .map((line) => {
    const node1 = line.trim().split(")")[0];
    const node2 = line.trim().split(")")[1];
    nodes.add(node1);
    nodes.add(node2);
    if (edges[node1]) {
      edges[node1].push(node2);
    } else {
      edges[node1] = [node2];
    }
  });

let orbits = 0;

function dfs(node: string, depth: number) {
  const children = edges[node];
  orbits += depth;
  (children || []).forEach((child) => {
    dfs(child, depth + 1);
  });
}
dfs("COM", 0);

// dfs without recursion
// let stack = [["COM", 0]];
// while (stack.length > 0) {
//   const current = stack.pop()!;
//   const children = edges[current[0]] || [];
//   const currentDepth = current[1] as number;
//   const newChildren = children.map((n) => [n, currentDepth + 1]);
//   stack = [...stack, ...newChildren];
//   orbits += currentDepth;
// }

// 314247
console.log("==== result", orbits);
