import { types } from "@babel/core";
import { generate } from "@/core";

export const generateJSXMemberExpression = (expression: types.JSXMemberExpression) => {
    const object = generate(expression.object);
    const property = generate(expression.property);
    return `${object}.${property}`;
}