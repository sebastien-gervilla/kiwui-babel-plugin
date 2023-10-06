import { types } from "@babel/core";
import { generate, generateFromArray } from "@/core";


export const generateFunctionExpression = (expression: types.FunctionExpression): string => {
    const name = expression.id ? expression.id.name : '';
    const params = generateFromArray(expression.params);
    const body = generate(expression.body);

    const prefixes = expression.async ? 'async ' : '';

    return `${prefixes}function ${name}(${params}) ${body}`;
};

