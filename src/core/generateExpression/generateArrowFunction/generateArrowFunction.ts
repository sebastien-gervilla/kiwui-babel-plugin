import { types } from "@babel/core";
import generateExpression from "../generateExpression";
import { generateArrayPatternElements } from "../generateArrayPatternElement";
import { generateObjectPatternProperties } from "../generateObjectPatternProperties";
import { generatePattern } from "../generatePattern";
import { generateFunctionDeclaration } from "../generateFunctionDeclaration";
import { generateFunctionExpression } from "../generateFunctionExpression";
import { generateBlockStatement } from "../generateBlockStatement";

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

const generateArrowFunctionBody = (body: types.Expression | types.Statement | types.BlockStatement | types.FunctionDeclaration | types.FunctionExpression): string => {
    if (isBlockStatement(body)) {
        const isSingleLine = !(body.body.length === 1);
        return generateBlockStatement(body,isSingleLine);
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
