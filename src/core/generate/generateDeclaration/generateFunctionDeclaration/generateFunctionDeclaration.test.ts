import { types } from "@babel/core";
import { generateFunctionDeclaration } from "./generateFunctionDeclaration";

describe('generateFunctionDeclaration', () => {
    it('should generate the correct function declaration', () => {
        const declaration = types.functionDeclaration(
            types.identifier('myFunction'), [
                types.identifier('param1'),
                types.identifier('param2')
            ],
            types.blockStatement([
                types.expressionStatement(
                    types.numericLiteral(42)
                )
            ])
        );
        
        const result = generateFunctionDeclaration(declaration);
        expect(result).toBe('function myFunction(param1, param2) {\n42;\n}');
    });
});
