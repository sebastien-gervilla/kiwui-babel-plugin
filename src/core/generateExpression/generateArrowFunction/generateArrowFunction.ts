import { types } from "@babel/core";
import generateExpression from "../generateExpression";
import { generateArrayPatternElements } from "../generateArrayPatternElement";
import { generateObjectPatternProperties } from "../generateObjectPatternProperties";

const {
    isIdentifier,
    isBlockStatement,
    isReturnStatement,
    isObjectPattern,
    isArrayPattern
} = types

export const generateArrowFunction = (expression: types.ArrowFunctionExpression): string => {
    const params = expression.params.map(param => {
        if (isIdentifier(param)) {
            return param.name;
        } else if (isObjectPattern(param)) {
            return `{ ${generateObjectPatternProperties(param)} }`;
        } else if (isArrayPattern(param)) {
            return `[ ${generateArrayPatternElements(param)} ]`;
        } else {
            return '';
        }
    }).filter(Boolean).join(', ');

    const isAsync = expression.async ? "async " : ""; // Ajoutez "async" si la fonction est asynchrone

    const body = isBlockStatement(expression.body)
        ? generateBlockStatement(expression.body) 
        : expression.body
            ? generateExpression(expression.body)
            : '{ }'; 

    return params ? `${isAsync}(${params}) => ${body}` : `${isAsync}() => ${body}`;
};


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
