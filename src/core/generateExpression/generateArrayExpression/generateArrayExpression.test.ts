import { types } from "@babel/core";
import { generateArrayExpression } from "./generateArrayExpression";

describe('generateArrayExpression', () => {
    it('should generate the correct array expression', () => {
        const expression = {
            type: 'ArrayExpression',
            elements: [
                {
                    type: 'NumericLiteral',
                    value: 1
                },
                {
                    type: 'StringLiteral',
                    value: 'two'
                },
                null,
                {
                    type: 'BooleanLiteral',
                    value: true
                }
            ]
        } as types.ArrayExpression;
        
        const result = generateArrayExpression(expression);
        expect(result).toBe('[1, "two", true]');
    });
    
});