import { types } from "@babel/core";
import generateExpression from "../generateExpression";
import { generateVariableDeclaration } from "../generateVariableDeclaration";

const {
    isExpression,
    isVariableDeclaration,
    isNumericLiteral,
    isStringLiteral,
    isMemberExpression,
    isIdentifier
} = types


export const generateAssignementExpression = (expression : types.AssignmentExpression ) => {
    let left = '';
    left = generateExpression(expression.left);
    const right = generateExpression(expression.right);
    return `${left} = ${right}`;
}