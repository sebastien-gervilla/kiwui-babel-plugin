import { types } from "@babel/core";
import { generateDoWhileStatement } from "./generateDoWhileStatement"; // Mettez le chemin correct vers le fichier

describe("generateDoWhileStatement", () => {
    it("should generate a do-while statement", () => {
        const bodyExpression = types.callExpression(types.identifier("console.log"), [types.stringLiteral("Hello")]);
        const body = types.expressionStatement(bodyExpression);
        
        const test = types.binaryExpression("<", types.identifier("x"), types.numericLiteral(10));
        const doWhileStatement = types.doWhileStatement(body, test);

        const result = generateDoWhileStatement(doWhileStatement);

        expect(result).toBe('do {\n  console.log("Hello");\n} while (x < 10);');
    });
    // ... autres tests ...
});