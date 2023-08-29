
import { types } from '@babel/core';
import { generateUnaryExpression } from './generateUnaryExpression'; // Assurez-vous d'importer correctement la fonction

describe('generateUnaryExpression', () => {
    it('should generate the correct code for a unary expression', () => {
        const expression = {
            type: 'UnaryExpression',
            operator: '!',
            argument: { type: 'Identifier', name: 'value' }
        } as types.UnaryExpression;
        
        const result = generateUnaryExpression(expression);
        expect(result).toBe('!value');
    });

});