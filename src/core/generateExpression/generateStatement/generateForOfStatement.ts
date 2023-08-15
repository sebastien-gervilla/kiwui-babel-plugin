import { types } from "@babel/core";
import generateExpression from "../generateExpression";
import { generateStatement } from "./generateStatement";
import { generateVariableDeclaration } from "../generateVariableDeclaration";


const {
    isExpression,
    isVariableDeclaration
} = types

export const generateForOfStatement = (expression: types.ForOfStatement): string => {
    let left = '';
    if (isExpression(expression.left)) {
        left = generateExpression(expression.left);
    } else {
        if (isVariableDeclaration(expression.left)){
            left = generateVariableDeclaration(expression.left)
        }
    
        console.log("isForOfStatement")
        console.log(expression.left)
        // Traitez les cas où expression.left n'est pas une expression valide
    }
    const right = generateExpression(expression.right);
    const body = generateStatement(expression.body);
    return `for (${left} of ${right}) ${body}`;
}