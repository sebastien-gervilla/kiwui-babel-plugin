import { types } from "@babel/core";
import { generate } from "@/core";

const {
    isBinaryExpression,
    isLogicalExpression
} = types;
  
export const generateBinaryExpression = (expression: BinaryOrLogical, parentPrecedence: number = 0): string => {
    const currentPrecedence = precedence[expression.operator];

    const left = isBinaryOrLogical(expression.left)
        ? generateBinaryExpression(expression.left, currentPrecedence)
        : generate(expression.left);


    const right = isBinaryOrLogical(expression.right)
        ? generateBinaryExpression(expression.right, currentPrecedence)
        : generate(expression.right);
  
    return currentPrecedence < parentPrecedence 
        ? `(${left} ${expression.operator} ${right})`
        : `${left} ${expression.operator} ${right}`;
};

type BinaryOrLogical = types.BinaryExpression | types.LogicalExpression;
const isBinaryOrLogical = (expression: any): expression is BinaryOrLogical => 
    isBinaryExpression(expression) || isLogicalExpression(expression);

// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Operator_precedence
const precedence: Record<BinaryOrLogical['operator'], number> = {
    "|>": 2,
    "||": 4, "??": 4,
    "&&": 5,
    "|": 6,
    "^": 7,
    "&": 8,
    "==": 9, "!=": 9, "===": 9, "!==": 9,
    "<": 10, ">": 10, "<=": 10, ">=": 10, "instanceof": 10, "in": 10,
    "<<": 11, ">>": 11, ">>>": 11,
    "+": 12, "-": 12,
    "*": 13, "/": 13, "%": 13,
    "**": 14
};