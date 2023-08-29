import { types } from "@babel/core";
import { generateBlockStatement } from "../generateBlockStatement";
import { generateStatement } from "../generateStatement";

describe("generateBlockStatement", () => {
  it("generates block statement correctly with braces", () => {
    const stmt1 = types.expressionStatement(types.identifier("x"));
    const stmt2 = types.expressionStatement(types.identifier("y"));
    const block = types.blockStatement([stmt1, stmt2]);

    const result = generateBlockStatement(block);

    const expected = `{\n${generateStatement(stmt1)}\n${generateStatement(stmt2)}\n}`;
    expect(result).toBe(expected);
  });

  it("generates block statement correctly without braces", () => {
    const stmt1 = types.expressionStatement(types.identifier("x"));
    const stmt2 = types.expressionStatement(types.identifier("y"));
    const block = types.blockStatement([stmt1, stmt2]);

    const result = generateBlockStatement(block, false);

    const expected = `${generateStatement(stmt1)}\n${generateStatement(stmt2)}`;
    expect(result).toBe(expected);
  });
});