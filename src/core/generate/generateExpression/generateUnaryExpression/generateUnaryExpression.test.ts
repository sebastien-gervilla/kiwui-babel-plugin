import { types } from "@babel/core";
import { generateUnaryExpression } from "./generateUnaryExpression";

const runFirstTest = () => it("should generate a simple unary expression with a negation operator", () => {
    const unaryExpression = types.unaryExpression("-", types.numericLiteral(42));

    const result = generateUnaryExpression(unaryExpression);

    expect(result).toBe("- 42");
});

const runSecondTest = () => it("should generate a unary expression with a logical NOT operator", () => {
    const unaryExpression = types.unaryExpression("!", types.booleanLiteral(true));

    const result = generateUnaryExpression(unaryExpression);

    expect(result).toBe("! true");
});

const runThirdTest = () => it("should generate a unary expression with typeof operator", () => {
    const unaryExpression = types.unaryExpression("typeof", types.identifier("variable"));

    const result = generateUnaryExpression(unaryExpression);

    expect(result).toBe("typeof variable");
});

const runFourthTest = () => it("should generate a unary expression with void operator", () => {
    const unaryExpression = types.unaryExpression("void", types.stringLiteral("Hello"));

    const result = generateUnaryExpression(unaryExpression);

    expect(result).toBe("void \"Hello\"");
});

const runFifthTest = () => it("should generate a unary expression with delete operator", () => {
    const unaryExpression = types.unaryExpression("delete", types.memberExpression(
        types.identifier("object"),
        types.stringLiteral("property"),
        true
    ));

    const result = generateUnaryExpression(unaryExpression);

    expect(result).toBe("delete object[\"property\"]");
});

describe("generateUnaryExpression", () => {
    runFirstTest();
    runSecondTest();
    runThirdTest();
    runFourthTest();
    runFifthTest();
});