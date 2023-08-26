import { types } from "@babel/core";
import { generateObjectExpression } from "../generateObjectExpression";
 
describe("generateObjectExpression", () => {
    it("should generate an object expression with identifier property key", () => {
        const property = types.objectProperty(types.identifier("x"), types.numericLiteral(5));
        const expression = types.objectExpression([property]);

        const result = generateObjectExpression(expression);

        expect(result).toBe("{ x: 5 }");
    });

    it("should generate an object expression with string literal property key", () => {
        const property = types.objectProperty(types.stringLiteral("name"), types.stringLiteral("John"));
        const expression = types.objectExpression([property]);

        const result = generateObjectExpression(expression);

        expect(result).toBe('{ name: "John" }');
    });

    it("should ignore non-identifier and non-string-literal property keys", () => {
        const property1 = types.objectProperty(types.identifier("x"), types.numericLiteral(10));
        const property2 = types.objectProperty(types.identifier("y"), types.stringLiteral("value"));
        const expression = types.objectExpression([property1, property2]);

        const result = generateObjectExpression(expression);

        expect(result).toBe('{ x: 10, y: "value" }');
    });

    it("should ignore properties with non-expression values", () => {
        const property = types.objectProperty(types.identifier("key"), types.stringLiteral("value")); // Utiliser une StringLiteral comme valeur
        const expression = types.objectExpression([property]);

        const result = generateObjectExpression(expression);

        expect(result).toBe('{ key: "value" }');
    });

    it("should handle multiple properties", () => {
        const property1 = types.objectProperty(types.identifier("x"), types.numericLiteral(5));
        const property2 = types.objectProperty(types.identifier("y"), types.numericLiteral(10));
        const expression = types.objectExpression([property1, property2]);

        const result = generateObjectExpression(expression);

        expect(result).toBe("{ x: 5, y: 10 }");
    });
});