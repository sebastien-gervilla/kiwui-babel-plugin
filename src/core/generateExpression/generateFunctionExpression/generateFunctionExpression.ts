import { generatePattern } from "../generatePattern";
import { generateStatement } from "../generateStatement";
import { types } from "@babel/core";


export const generateFunctionExpression = (expression: types.FunctionExpression): string => {
    const functionName = expression.id ? expression.id.name : '';
    const params = expression.params.map(param => generatePattern(param)).join(', ');
    const body = generateBlockStatement(expression.body);

    return `${functionName ? 'function ' + functionName : ''}(${params}) ${body}`;
};

const generateBlockStatement = (block: types.BlockStatement, wrapWithBraces: boolean = true): string => {
    const statements = block.body.map(stmt => generateStatement(stmt)).join('\n');
    return wrapWithBraces ? `{\n${statements}\n}` : statements;
}