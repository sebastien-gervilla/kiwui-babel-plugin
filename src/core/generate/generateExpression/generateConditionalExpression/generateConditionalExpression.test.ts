import { types } from "@babel/core";
import { generateConditionalExpression } from "./generateConditionalExpression";

describe('generateConditionalExpression', () => {
    it('should generate the correct conditional expression', () => {
        const expression = types.conditionalExpression(
            types.binaryExpression(
                '>', 
                types.identifier('x'), 
                types.numericLiteral(5)
            ),
            types.numericLiteral(10),
            types.numericLiteral(20)
        )
        
        const result = generateConditionalExpression(expression);
        expect(result).toBe('x > 5 ? 10 : 20');
    });
    
});