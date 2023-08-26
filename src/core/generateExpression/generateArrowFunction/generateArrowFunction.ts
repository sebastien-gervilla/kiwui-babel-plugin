import { types } from "@babel/core";
import generateExpression from "../generateExpression";

const {
    isIdentifier,
    isBlockStatement,
    isReturnStatement
} = types

export const generateArrowFunction = (expression : types.ArrowFunctionExpression) => {
    const params = expression.params.map(param => {
        if (isIdentifier(param)) {
            return param.name;
        }
        return '';
    }).filter(Boolean).join(', ');

    const body = isBlockStatement(expression.body)
        ? generateBlockStatement(expression.body) 
        : expression.body
            ? generateExpression(expression.body)
            : '{ }'; 

    return params ? `(${params}) => ${body}` : `() => ${body}`;
}

const generateBlockStatement = (block: types.BlockStatement, wrapWithBraces: boolean = true): string => {
    const statements = block.body.map(stmt => generateStatement(stmt)).join('\n');
    return wrapWithBraces ? `{\n${statements}\n}` : statements;
}

const generateStatement = (statement: types.Statement): string => {

    if (isReturnStatement(statement)) {
        if (statement.argument !== null && statement.argument !== undefined) {
            const argument = generateExpression(statement.argument);
            return `return ${argument};`;
        } else {
            return 'return;';
        }
    }

    return generateExpression(statement); 
}
