import { types } from "@babel/core";
import { generate, generateFromArray } from "@/core";

export const generateOptionalCallExpression = (expression: types.OptionalCallExpression) => {
    const callee = generate(expression.callee);
    const args = generateFromArray(expression.arguments, ', ');

    return `${callee}?.(${args})`;
}