import { types } from "@babel/core";
import { generate } from "../../generate";

// TODO: Generate LVAL
export const generateAssignmentExpression = (expression : types.AssignmentExpression) => {
    
    let left = '';
    if (types.isExpression(expression.left)) // TODO: This could be generate only
        left = generate(expression.left);
    const right = generate(expression.right);
    
    return `${left} ${expression.operator} ${right}`;
}