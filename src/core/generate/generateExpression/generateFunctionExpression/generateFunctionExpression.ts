import { types } from "@babel/core";
import { generate, generateFromArray } from "@/core";


export const generateFunctionExpression = (expression: types.FunctionExpression): string => {
    const functionName = expression.id ? expression.id.name : '';
    const params = generateFromArray(expression.params);
    const body = generate(expression.body);

    return `${
        functionName 
            ? 'function ' + functionName 
            : ''
    }(${params}) ${body}`;
};

