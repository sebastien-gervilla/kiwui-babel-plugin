import { types } from "@babel/core";
import { generate } from "@/core";
const {
    isExpression,
    isVariableDeclaration
} = types

export const generateForOfStatement = (expression: types.ForOfStatement): string => {
    let left = '';
    if (isExpression(expression.left)) {
        left = generate(expression.left);
    } else {
        if (isVariableDeclaration(expression.left)){
            left = generate(expression.left)
        }
        throw new Error(`ForOf , left Operator not supported ${expression.left}`)
    }
    const right = generate(expression.right);
    const body = generate(expression.body);
    return `for (${left} of ${right}) ${body}`;
}