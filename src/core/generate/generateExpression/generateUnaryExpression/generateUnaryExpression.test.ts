
import { types } from '@babel/core';
import { generateUnaryExpression } from './generateUnaryExpression'; // Assurez-vous d'importer correctement la fonction

describe('generateUnaryExpression', () => {
    it('should generate the correct code for a unary expression', () => {
        const expression = types.unaryExpression(
            '!', types.identifier('value')
        );
        
        const result = generateUnaryExpression(expression);
        expect(result).toBe('!value');
    });

});