import { types } from "@babel/core";
import { generateFunctionDeclaration } from "./generateFunctionDeclaration";

describe('generateFunctionDeclaration', () => {
    it('should generate the correct function declaration', () => {
        const declaration = {
            type: 'FunctionDeclaration',
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
        } as types.FunctionDeclaration; 
        
        const result = generateFunctionDeclaration(declaration);
        expect(result).toBe('function myFunction(param1, param2) {\n42\n}');
    });
    
});
