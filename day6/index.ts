// https://adventofcode.com/2019/day/6

import fs from "fs";
import { intersection } from "lodash";

const edges = {} as {
  [key: string]: string[];
};

let startAt = "";
let endAt = "";

fs.readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n")
  .map((line) => {
    const node1 = line.trim().split(")")[0];
    const node2 = line.trim().split(")")[1];
    // part 2 ====
    if (node2 === "YOU") {
      startAt = node1;
    }
    if (node2 === "SAN") {
      endAt = node1;
    }
    // ====
    if (edges[node1]) {
      edges[node1].push(node2);
    } else {
      edges[node1] = [node2];
    }
  });

// part1
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

// part1: 314247;
// console.log("==== result", orbits);

// part 2
const allNodes = Object.keys(edges);
const allEdges = Object.values(edges);
function linkToCom(node: string) {
  let path = [] as string[];
  function jump(node: string) {
    path.push(node);
    allEdges.forEach((edge, index) => {
      if (edge.includes(node)) {
        const next = allNodes[index];
        jump(next);
      }
    });
  }
  jump(node);
  return path;
}
const path1 = linkToCom(startAt);
const path2 = linkToCom(endAt);
const common = intersection(path1, path2);
// expected 514
console.log("=== result", path1.indexOf(common[0]) + path2.indexOf(common[0]));
