import { types } from "@babel/core";
import { generateArrayExpression } from "./generateArrayExpression";

describe('generateArrayExpression', () => {
    it('should generate the correct array expression', () => {
        const expression = types.arrayExpression([
            types.numericLiteral(1),
            types.stringLiteral('two'),
            null,
            types.booleanLiteral(true),
        ]);
        
        const result = generateArrayExpression(expression);
        expect(result).toBe('[1, "two", true]');
    });
    
});