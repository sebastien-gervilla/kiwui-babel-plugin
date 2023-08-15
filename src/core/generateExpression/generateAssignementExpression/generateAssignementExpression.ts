import { types } from "@babel/core";
import generateExpression from "../generateExpression";
import { generateVariableDeclaration } from "../generateVariableDeclaration";

const {
    isExpression,
    isVariableDeclaration
} = types


export const generateAssignementExpression = (expression : types.AssignmentExpression ) => {
    let left = '';
        if (isExpression(expression.left)) {
            left = generateExpression(expression.left);
        } else {
            if (isVariableDeclaration(expression.left)){
                left = generateVariableDeclaration(expression.left)
            }


            console.log("isAssignmentExpression")
            console.log(expression.left)
            // Traitez les cas où expression.left n'est pas une expression valide
        }
    
        const right = generateExpression(expression.right);
        return `${left} = ${right}`;
}