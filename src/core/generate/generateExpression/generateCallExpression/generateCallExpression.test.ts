import { types } from "@babel/core";
import { generateCallExpression } from "../generateCallExpression";

describe("generateCallExpression", () => {
  it("should generate a call expression with identifier callee", () => {
    const callee = types.identifier("myFunction");
    const arg1 = types.numericLiteral(42);
    const arg2 = types.stringLiteral("hello");
    const expression = types.callExpression(callee, [arg1, arg2]);

    const result = generateCallExpression(expression);

    expect(result).toBe("myFunction(42, \"hello\")");
  });

  it("should generate a call expression with member expression callee", () => {
    const object = types.identifier("myObject");
    const property = types.identifier("myMethod");
    const callee = types.memberExpression(object, property);
    const arg = types.booleanLiteral(true);
    const expression = types.callExpression(callee, [arg]);

    const result = generateCallExpression(expression);

    expect(result).toBe("myObject.myMethod(true)");
  });

  it("should generate a call expression with spread element argument", () => {
    const callee = types.identifier("myFunction");
    const arg1 = types.numericLiteral(42);
    const arg2 = types.stringLiteral("hello");
    const spreadArg = types.identifier("otherArgs");
    const expression = types.callExpression(callee, [arg1, arg2, types.spreadElement(spreadArg)]);

    const result = generateCallExpression(expression);

    expect(result).toBe("myFunction(42, \"hello\", ...otherArgs)");
  });

  it("should generate a call expression with argument placeholders", () => {
    const callee = types.identifier("myFunction");
    const arg1 = types.numericLiteral(42);
    const arg2 = types.stringLiteral("hello");
    const expression = types.callExpression(callee, [arg1, arg2]);

    const result = generateCallExpression(expression);

    expect(result).toBe("myFunction(42, \"hello\")");
  });
});