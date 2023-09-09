import { types } from "@babel/core";
import { generate } from "../../generate";

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

const { // TODO: Find a way to better handle these
    isBinaryExpression,
    isLogicalExpression
} = types;
  
export const generateBinaryExpression = (expression: types.BinaryExpression | types.LogicalExpression, parentPrecedence: number = 0): string => {
    const currentPrecedence = precedence[expression.operator];

    const left = isBinaryExpression(expression.left)
        ? generateBinaryExpression(expression.left, currentPrecedence)
        : isLogicalExpression(expression.left)
            ? generateBinaryExpression(expression.left, currentPrecedence) // TODO: Sepate logical from binary ?
            : generate(expression.left);


    const right = isBinaryExpression(expression.right)
        ? generateBinaryExpression(expression.right, currentPrecedence)
        : isLogicalExpression(expression.right)
            ? generateBinaryExpression(expression.right, currentPrecedence)
            : generate(expression.right);
  
    if (currentPrecedence !== undefined && currentPrecedence < parentPrecedence) {
      return `(${left} ${expression.operator} ${right})`;
    }
  
    return `${left} ${expression.operator} ${right}`;
};

const isBinaryOrLogical = (expression: any): expression is types.BinaryExpression | types.LogicalExpression => 
    isBinaryExpression(expression) || isLogicalExpression(expression)
