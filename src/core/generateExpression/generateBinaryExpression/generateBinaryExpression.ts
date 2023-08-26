import { types } from "@babel/core";
import generateExpression from "../generateExpression";

const {
    isLogicalExpression,
    isBinaryExpression
} = types


const precedence: Record<string, number> = {
    "||": 1,
    "&&": 2,
    "|": 3,
    "^": 4,
    "&": 5,
    "==": 6, "!=": 6, "===": 6, "!==": 6,
    "<": 7, ">": 7, "<=": 7, ">=": 7,
    "<<": 8, ">>": 8, ">>>": 8,
    "+": 9, "-": 9,
    "*": 10, "/": 10, "%": 10,
    "**": 11
};
  
export const generateBinaryExpression = (expression: types.BinaryExpression | types.LogicalExpression, parentPrecedence: number = 0): string => {
    const currentPrecedence = precedence[expression.operator];
    const left = generateExpression(expression.left, currentPrecedence);
    const right = generateExpression(expression.right, currentPrecedence);
  
    if (currentPrecedence !== undefined && currentPrecedence < parentPrecedence) {
      return `(${left} ${expression.operator} ${right})`;
    }
  
    return `${left} ${expression.operator} ${right}`;
};


// export const generateBinaryExpression = (expression: types.BinaryExpression | types.LogicalExpression): string => {
//     let left = '';
//     if (isExpression(expression.left)) {
//         left = generateExpression(expression.left);
//     } else {
//         console.log("isLogicalExpr ession")
//         console.log(expression.left)
//     }

//     const right = generateExpression(expression.right);
//     return `${left} ${expression.operator} ${right}`;// Ignore PrivateName
// }