import { types } from "@babel/core";
import { generate, generateFromArray } from "@/core";

export const generateArrowFunction = (expression: types.ArrowFunctionExpression): string => {
    const params = generateFromArray(expression.params);

    const prefixes = expression.async ? "async " : "";
    const body = generate(expression.body);

    return params 
        ? `${prefixes}(${params}) => ${body}` 
        : `${prefixes}() => ${body}`;
};