import { types } from "@babel/core";
import { generate } from "@/core";

export const generateAssignmentExpression = (expression: types.AssignmentExpression) => {
    const left = generate(expression.left);
    const right = generate(expression.right);
    
    return `${left} ${expression.operator} ${right}`;
}