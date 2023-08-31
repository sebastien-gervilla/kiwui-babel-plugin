import { types } from "@babel/core";
import { generateConditionalExpression } from "./generateConditionalExpression";

describe('generateConditionalExpression', () => {
    it('should generate the correct conditional expression', () => {
        const expression = {
            type: 'ConditionalExpression',
            test: {
                type: 'BinaryExpression',
                operator: '>',
                left: { type: 'Identifier', name: 'x' },
                right: { type: 'NumericLiteral', value: 5 }
            },
            consequent: {
                type: 'NumericLiteral',
                value: 10
            },
            alternate: {
                type: 'NumericLiteral',
                value: 20
            }
        } as types.ConditionalExpression; 
        
        const result = generateConditionalExpression(expression);
        expect(result).toBe('x > 5 ? 10 : 20');
    });
    
});