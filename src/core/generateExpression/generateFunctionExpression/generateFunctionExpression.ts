import { generateBlockStatement } from "../generateBlockStatement";
import { generatePattern } from "../generatePattern";
import { types } from "@babel/core";


export const generateFunctionExpression = (expression: types.FunctionExpression): string => {
    const functionName = expression.id ? expression.id.name : '';
    const params = expression.params.map(param => generatePattern(param)).join(', ');
    const body = generateBlockStatement(expression.body);

    return `${functionName ? 'function ' + functionName : ''}(${params}) ${body}`;
};

