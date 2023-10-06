import { types } from "@babel/core";
import { generateBlockStatement } from "./generateBlockStatement";

const runFirstTest = () => it("should generate a simple block statement", () => {
    const blockStatement = types.blockStatement([
        types.expressionStatement(types.stringLiteral("Statement 1")),
        types.expressionStatement(types.stringLiteral("Statement 2")),
    ]);

    const result = generateBlockStatement(blockStatement);

    expect(result).toBe(`{\n"Statement 1";\n"Statement 2";\n}`);
});

describe("generateBlockStatement", () => {
    runFirstTest();
});