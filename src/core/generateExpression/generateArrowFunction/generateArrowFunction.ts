import { types } from "@babel/core";
import generateExpression from "../generateExpression";
import { generateArrayPatternElements } from "../generateArrayPatternElement";
import { generateObjectPatternProperties } from "../generateObjectPatternProperties";
import { generatePattern } from "../generatePattern";
import { generateFunctionDeclaration } from "../generateFunctionDeclaration";
import { generateFunctionExpression } from "../generateFunctionExpression";

const {
    isBlockStatement,
    isReturnStatement,
    isFunctionDeclaration,
    isFunctionExpression,
    isArrowFunctionExpression,
} = types

export const generateArrowFunction = (expression: types.ArrowFunctionExpression): string => {
    const params = expression.params.map(param => generatePattern(param)).join(', ');

    const isAsync = expression.async ? "async " : "";
    const body = generateArrowFunctionBody(expression.body);

    return params ? `${isAsync}(${params}) => ${body}` : `${isAsync}() => ${body}`;
};

const generateBlockStatement = (block: types.BlockStatement, wrapWithBraces: boolean = true): string => {
    const statements = block.body.map(stmt => generateStatement(stmt)).join('\n');
    return wrapWithBraces ? `{\n${statements}\n}` : statements;
}


const generateArrowFunctionBody = (body: types.Expression | types.Statement | types.BlockStatement | types.FunctionDeclaration | types.FunctionExpression): string => {
    if (isBlockStatement(body)) {
        return generateBlockStatement(body);
    } else if (isFunctionDeclaration(body)) {
        return generateFunctionDeclaration(body);
    } else if (isFunctionExpression(body)) {
        return generateFunctionExpression(body);
    } else if (isArrowFunctionExpression(body)) {
        return generateArrowFunction(body);
    } else {
        return generateExpression(body);
    }
};

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
