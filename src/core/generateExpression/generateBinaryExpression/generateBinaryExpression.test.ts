import { types } from "@babel/core";
import { generateBinaryExpression } from "../generateBinaryExpression";

describe("generateBinaryExpression", () => {
  it("should generate a binary expression", () => {
    const leftExpression = types.identifier("x");
    const rightExpression = types.numericLiteral(5);
    const binaryExpression = types.binaryExpression("+", leftExpression, rightExpression);

    const result = generateBinaryExpression(binaryExpression);

    expect(result).toBe("x + 5");
  });

  it("should handle expressions on both sides", () => {
    const leftExpression = types.numericLiteral(10);
    const rightExpression = types.identifier("y");
    const binaryExpression = types.binaryExpression("*", leftExpression, rightExpression);

    const result = generateBinaryExpression(binaryExpression);

    expect(result).toBe("10 * y");
  });

  it("should handle complex expressions", () => {
    const leftExpression = types.binaryExpression("+", types.identifier("a"), types.numericLiteral(2));
    const rightExpression = types.binaryExpression("-", types.identifier("b"), types.numericLiteral(3));
    const binaryExpression = types.binaryExpression("*", leftExpression, rightExpression);

    const result = generateBinaryExpression(binaryExpression);

    expect(result).toBe("(a + 2) * (b - 3)");
  });
});
