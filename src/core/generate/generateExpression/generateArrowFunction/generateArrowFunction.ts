import { types } from "@babel/core";
import { generate, generateFromArray } from "@/core";

export const generateArrowFunction = (expression: types.ArrowFunctionExpression): string => {
    const params = generateFromArray(expression.params);

    const isAsync = expression.async ? "async " : "";
    const body = generate(expression.body);

    return params 
        ? `${isAsync}(${params}) => ${body}` 
        : `${isAsync}() => ${body}`;
};