import { types } from "@babel/core";
import { generateAwaitExpression } from "./generateAwaitExpression";

describe('generateAwaitExpression', () => {
    it('should generate the correct await expression', () => {
        const expression = {
            type: 'AwaitExpression',
            argument: {
                type: 'Identifier',
                name: 'promise'
            }
        } as types.AwaitExpression; 
        
        const result = generateAwaitExpression(expression);
        expect(result).toBe('await promise');
    });
    
});