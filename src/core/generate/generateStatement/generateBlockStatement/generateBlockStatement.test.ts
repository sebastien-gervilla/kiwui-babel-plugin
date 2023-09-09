import { types } from "@babel/core"
// @ts-ignore;
import { generate } from "@/core";

describe("generateBlockStatement", () => {
  it("generates block statement correctly with braces", () => {
    const stmt1 = types.expressionStatement(types.identifier("x"));
    const stmt2 = types.expressionStatement(types.identifier("y"));
    const block = types.blockStatement([stmt1, stmt2]);

    const result = generate(block);

    const expected = `{\n${generate(stmt1)};\n${generate(stmt2)};\n}`;
    expect(result).toBe(expected);
  });
});