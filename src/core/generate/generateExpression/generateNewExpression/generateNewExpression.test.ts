import { types } from "@babel/core";
import { generateNewExpression } from "./generateNewExpression";

describe('generateNewExpression', () => {
    it('should generate the correct new expression', () => {
        const expression = types.newExpression(
            types.identifier('SomeClass'), [
                types.numericLiteral(42),
                types.stringLiteral('hello')
            ]
        )
        
        const result = generateNewExpression(expression);
        expect(result).toBe('new SomeClass(42, "hello")');
    });
    
});