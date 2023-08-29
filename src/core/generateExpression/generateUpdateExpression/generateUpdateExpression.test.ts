import { types } from '@babel/core';
import { generateUpdateExpression } from './generateUpdateExpression'; // Assurez-vous d'importer correctement la fonction

describe('generateUpdateExpression', () => {
    it('should generate the correct code for a prefix update expression', () => {
        const expression = {
            type: 'UpdateExpression',
            operator: '++',
            argument: { type: 'Identifier', name: 'value' },
            prefix: true
        } as types.UpdateExpression;
        
        const result = generateUpdateExpression(expression);
        expect(result).toBe('++value');
    });

    it('should generate the correct code for a postfix update expression', () => {
        const expression = {
            type: 'UpdateExpression',
            operator: '--',
            argument: { type: 'Identifier', name: 'value' },
            prefix: false
        } as types.UpdateExpression;
        
        const result = generateUpdateExpression(expression);
        expect(result).toBe('value--');
    });

});