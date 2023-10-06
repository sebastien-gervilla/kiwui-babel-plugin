import { types } from "@babel/core";
import { generateFunctionExpression } from "./generateFunctionExpression";

describe('generateFunctionExpression', () => {
    it('should generate the correct function expression', () => {
        const expression = types.functionExpression(
            types.identifier('myFunction'), [
                types.identifier('param1'),
                types.identifier('param2')
            ],
            types.blockStatement([
                types.expressionStatement(
                    types.numericLiteral(42)
                )
            ])
        )
        
        const result = generateFunctionExpression(expression);
        expect(result).toBe('function myFunction(param1, param2) {\n42;\n}');
    });
    
});