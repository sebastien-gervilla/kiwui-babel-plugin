import { types } from "@babel/core";
import { generate, generateFromArray } from "@/core";

export const generateArrowFunction = (expression: types.ArrowFunctionExpression) => {
    const params = generateFromArray(expression.params);

    const prefixes = expression.async ? 'async ' : '';
    const body = generate(expression.body);

    return `${prefixes}(${params}) => ${body}`;
};