import { types } from "@babel/core";
import generateExpression from "../generateExpression";

export const generateAssignementExpression = (expression : types.AssignmentExpression ) => {
    
    let left = '';
    left = generateExpression(expression.left);
    const right = generateExpression(expression.right);
    
    return `${left} ${expression.operator} ${right}`;

}