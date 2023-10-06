import { types } from "@babel/core";
import { generateForOfStatement } from "./generateForOfStatement";

const runFirstTest = () => it("should generate a simple for...of loop", () => {
    const forOfStatement = types.forOfStatement(
        types.variableDeclaration("const", [
            types.variableDeclarator(types.identifier("item")),
        ]),
        types.identifier("iterable"),
        types.blockStatement([
            types.expressionStatement(types.stringLiteral("Iteration")),
        ])
    );

    const result = generateForOfStatement(forOfStatement);

    expect(result).toBe(`for (const item of iterable) {\n"Iteration";\n}`);
});

const runSecondTest = () => it("should generate a for...of loop with await", () => {
    const forOfStatement = types.forOfStatement(
        types.variableDeclaration("const", [
            types.variableDeclarator(types.identifier("item")),
        ]),
        types.identifier("iterable"),
        types.blockStatement([
            types.expressionStatement(types.stringLiteral("Iteration")),
        ]),
        true
    );

    const result = generateForOfStatement(forOfStatement);

    expect(result).toBe(`for await (const item of iterable) {\n"Iteration";\n}`);
});

describe("generateForOfStatement", () => {
    runFirstTest();
    runSecondTest();
});