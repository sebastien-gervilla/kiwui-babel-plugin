import { types } from "@babel/core";
import { generateAwaitExpression } from "./generateAwaitExpression";

describe('generateAwaitExpression', () => {
    it('should generate the correct await expression', () => {
        const expression = types.awaitExpression(
            types.callExpression(
                types.identifier('getUsers'),
                []
            )
        )
        
        const result = generateAwaitExpression(expression);
        expect(result).toBe('await getUsers()');
    });
    
});