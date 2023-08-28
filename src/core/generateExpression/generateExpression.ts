import { types } from "@babel/core";
import { generateJSXElement } from "..";
import { generateArrowFunction } from "./generateArrowFunction";
import { generateAssignementExpression } from "./generateAssignementExpression";
import { generateVariableDeclaration } from "./generateVariableDeclaration";
import { generateCallExpression } from "./generateCallExpression";
import { generateMemberExpression } from "./generateMemberExpression";
import { generateDoWhileStatement, generateForInStatement, generateForOfStatement, generateForStatement, generateIfStatement, generateStatement, generateThrowStatement, generateTryStatement, generateWhileStatement } from "./generateStatement";
import { generateObjectExpression } from "./generateObjectExpression";
import { generateBinaryExpression } from "./generateBinaryExpression";
import { generateAwaitExpression } from "./generateAwaitExpression";
import { generateFunctionDeclaration } from "./generateFunctionDeclaration";
import { generateFunctionExpression } from "./generateFunctionExpression";

const {
    isJSXEmptyExpression,
    isArrowFunctionExpression,
    isExpressionStatement,
    isIdentifier,
    isStringLiteral,
    isBlockStatement,
    isCallExpression,
    isArgumentPlaceholder,
    isMemberExpression,
    isSpreadElement,
    isObjectExpression,
    isPrivateName,
    isAssignmentExpression,
    isBinaryExpression,
    isNumericLiteral,
    isArrayExpression,
    isLogicalExpression,
    isBooleanLiteral,
    isConditionalExpression,
    isIfStatement,
    isWhileStatement,
    isDoWhileStatement,
    isForOfStatement,
    isVariableDeclaration,
    isForStatement,
    isUpdateExpression,
    isJSXElement,
    isNullLiteral,
    isUnaryExpression,
    isBreakStatement,
    isContinueStatement,
    isAwaitExpression,
    isTryStatement,
    isThrowStatement,
    isNewExpression,
    isForInStatement,
    isFunctionDeclaration,
    isFunctionExpression
} = types;


const generateExpression = (expression: types.Expression | types.JSXEmptyExpression | types.BlockStatement | types.Statement | types.Node, parentPrecedence: number = 0): string => {
    if (isJSXEmptyExpression(expression)) {
        // Handle JSXEmptyExpression (e.g., <Component />)
        return '';
    }

    if (isJSXElement(expression)){
        return generateJSXElement(expression)
    }

    if (isPrivateName(expression)) {
        return '';
    }

    if (isNullLiteral(expression)){
        return 'null';
    }


    if (isExpressionStatement(expression)) {
        return generateExpression(expression.expression);
    }

    if (isAssignmentExpression(expression)) {
        return generateAssignementExpression(expression);
    }

    if (isArrowFunctionExpression(expression)) {
        return generateArrowFunction(expression);
    }

    if (isArgumentPlaceholder(expression)) {
        return '';  // Ignore ArgumentPlaceholder
    }

    if (isBlockStatement(expression)) {
        const body = expression.body.map(stmt => generateStatement(stmt)).join('\n');
        return `{\n${body}\n}`;
    }

    if (isArrayExpression(expression)) {
        const elements = expression.elements
            .filter(element => element !== null) 
            .map(element => generateExpression(element as types.Expression))
            .join(', ');
        return `[${elements}]`;
    }

    if (isBooleanLiteral(expression)) {
        return expression.value ? 'true' : 'false';
    }

    if (isConditionalExpression(expression)) {
        const test = generateExpression(expression.test);
        const consequent = generateExpression(expression.consequent);
        const alternate = generateExpression(expression.alternate);
        return `${test} ? ${consequent} : ${alternate}`;
    }

    if (isVariableDeclaration(expression)) {
        return generateVariableDeclaration(expression)
    }

    if (isCallExpression(expression)) {
        return generateCallExpression(expression)
    }

    if (isUnaryExpression(expression)) {
        const argument = generateExpression(expression.argument);
        return `${expression.operator}${argument}`;
    }

    if (isMemberExpression(expression)) {
        if (isIdentifier(expression.object) && isIdentifier(expression.property) && expression.property.name === 'index') {
            return `${expression.object.name}[${expression.property.name}]`;
        }
        return generateMemberExpression(expression);
    }

    if (isIdentifier(expression)) {
        return expression.name;
    }

    if (isStringLiteral(expression)){
        return `\"${expression.value}\"`;
    }

    if (isNumericLiteral(expression)) {
        return expression.value.toString();
    }

    if (isSpreadElement(expression)) {
        if (isIdentifier(expression.argument)) {
            return `...${expression.argument}`;
        }
        return '';
    }

    if (isBinaryExpression(expression) || isLogicalExpression(expression)) {
        return generateBinaryExpression(expression, parentPrecedence);
    }

    if (isUpdateExpression(expression)) {
        const argument = generateExpression(expression.argument);
        const operator = expression.operator;
        if (expression.prefix) {
            return `${operator}${argument}`;
        } else {
            return `${argument}${operator}`;
        }
    }

    if (isTryStatement(expression)){
        return generateTryStatement(expression)
    }

    if (isObjectExpression(expression)) {
        return generateObjectExpression(expression)
    }

    if (isForOfStatement(expression)) {
        return generateForOfStatement(expression);
    }

    if (isIfStatement(expression)) {
        return generateIfStatement(expression);
    }

    if (isForStatement(expression)) {
        return generateForStatement(expression);
    }

    if (isWhileStatement(expression)) {
        return generateWhileStatement(expression);
    }

    if (isDoWhileStatement(expression)) {
        return generateDoWhileStatement(expression);
    }

    if (isBreakStatement(expression)){
        return "break;"
    }

    if (isContinueStatement(expression)){
        return "continue;"
    }

    if (isAwaitExpression(expression)){
        return generateAwaitExpression(expression);
    }

    if (isThrowStatement(expression)){
        return generateThrowStatement(expression)
    }

    if (isFunctionDeclaration(expression)) {
        return generateFunctionDeclaration(expression);
    } 
    
    if (isFunctionExpression(expression)) {
        return generateFunctionExpression(expression);
    }

    if (isNewExpression(expression)) {
        const callee = generateExpression(expression.callee);
        const argumentsList = expression.arguments.map(arg => generateExpression(arg)).join(', ');
        return `new ${callee}(${argumentsList})`;
    }

    if (isForInStatement(expression)) {
        return generateForInStatement(expression);
    }

    // Handle other JSX expressions
    throw new Error("Expression not supported");
}


export default generateExpression;