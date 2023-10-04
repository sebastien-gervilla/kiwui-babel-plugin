import { types } from "@babel/core";
import { generateArrowFunction } from "./generateArrowFunction";

const runFirstTest = () => it("should generate an arrow function with a rest parameter", () => {
    const arrowFunction = types.arrowFunctionExpression([
            types.identifier("param1"),
            types.restElement(types.identifier("restParams"))
        ],
        types.blockStatement([
            types.returnStatement(
                types.arrayExpression([types.spreadElement(types.identifier("restParams"))])
            ),
        ])
    );

    const result = generateArrowFunction(arrowFunction);

    expect(result).toBe("(param1, ...restParams) => {\nreturn [...restParams];\n}");
});

const runSecondTest = () => it("should generate an arrow function with a rest parameter and other parameters", () => {
    const param1 = types.identifier("param1");
    const param2 = types.identifier("param2");
    const restParam = types.restElement(types.identifier("restArgs"));
    const arrowFunction = types.arrowFunctionExpression(
        [param1, param2, restParam],
        types.blockStatement([
            types.returnStatement(
                types.arrayExpression([param1, param2, types.spreadElement(types.identifier("restArgs"))])
            ),
        ])
    );

    const result = generateArrowFunction(arrowFunction);

    expect(result).toBe("(param1, param2, ...restArgs) => {\nreturn [param1, param2, ...restArgs];\n}");
});

const runThirdTest = () => it("should generate an arrow function without a body", () => {
    const arrowFunction = types.arrowFunctionExpression(
        [types.identifier("param1"), types.identifier("param2")],
        types.identifier("param1")
    );

    const result = generateArrowFunction(arrowFunction);

    expect(result).toBe("(param1, param2) => param1");
});

const runFourthTest = () => it("should generate an arrow function with an expression body", () => {
    const arrowFunction = types.arrowFunctionExpression(
        [types.identifier("param1"), types.identifier("param2")],
        types.binaryExpression("+", types.identifier("param1"), types.identifier("param2"))
    );

    const result = generateArrowFunction(arrowFunction);

    expect(result).toBe("(param1, param2) => param1 + param2");
});

describe("generateArrowFunction", () => {
    runFirstTest();
    runSecondTest();
    runThirdTest();
    runFourthTest();
});