import { types } from "@babel/core";
import { generateFunctionExpression } from "./generateFunctionExpression";

describe('generateFunctionExpression', () => {
    it('should generate the correct function expression', () => {
        const expression = {
            type: 'FunctionExpression',
            id: { type: 'Identifier', name: 'myFunction' },
            params: [
                { type: 'Identifier', name: 'param1' },
                { type: 'Identifier', name: 'param2' }
            ],
            body: {
                type: 'BlockStatement',
                body: [
                    { type: 'ExpressionStatement', expression: { type: 'NumericLiteral', value: 42 } }
                ]
            }
        } as types.FunctionExpression; 
        
        const result = generateFunctionExpression(expression);
        expect(result).toBe('function myFunction(param1, param2) {\n42\n}');
    });
    
});