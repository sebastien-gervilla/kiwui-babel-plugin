import { types } from "@babel/core";
import { generate } from "@/core";

export const generateForOfStatement = (expression: types.ForOfStatement) => {
    const left = generate(expression.left);
    const right = generate(expression.right);
    const body = generate(expression.body);
    const prefix = expression.await ? 'await ' : '';
    return `for ${prefix}(${left} of ${right}) ${body}`;
}