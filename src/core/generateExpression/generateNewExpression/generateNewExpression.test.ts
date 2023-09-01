import { types } from "@babel/core";
import { generateNewExpression } from "./generateNewExpression";

describe('generateNewExpression', () => {
    it('should generate the correct new expression', () => {
        const expression = {
            type: 'NewExpression',
            callee: {
                type: 'Identifier',
                name: 'SomeClass'
            },
            arguments: [
                {
                    type: 'NumericLiteral',
                    value: 42
                },
                {
                    type: 'StringLiteral',
                    value: 'hello'
                }
            ]
        } as types.NewExpression;
        
        const result = generateNewExpression(expression);
        expect(result).toBe('new SomeClass(42, "hello")');
    });
    
});