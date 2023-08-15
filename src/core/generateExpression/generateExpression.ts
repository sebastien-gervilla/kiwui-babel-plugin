import { types } from "@babel/core";
import { generateJSXElement } from "..";
import { generateArrowFunction } from "./generateArrowFunction";
import { generateAssignementExpression } from "./generateAssignementExpression";
import { generateVariableDeclaration } from "./generateVariableDeclaration";
import { generateCallExpression } from "./generateCallExpression";
import { generateMemberExpression } from "./generateMemberExpression";
import { generateDoWhileStatement, generateForOfStatement, generateForStatement, generateIfStatement, generateStatement, generateWhileStatement } from "./generateStatement";
import { generateObjectExpression } from "./generateObjectExpression";
import { generateBinaryExpression } from "./generateBinaryExpression";

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
    isJSXNamespacedName,
    isObjectExpression,
    isExpression,
    isPrivateName,
    isAssignmentExpression,
    isBinaryExpression,
    isNumericLiteral,
    isArrayExpression,
    isLogicalExpression,
    isBooleanLiteral,
    isObjectProperty,
    isConditionalExpression,
    isIfStatement,
    isWhileStatement,
    isDoWhileStatement,
    isForOfStatement,
    isVariableDeclarator,
    isVariableDeclaration,
    isObjectPattern,
    isArrayPattern,
    isRestElement,
    isForStatement,
    isUpdateExpression,
    isJSXElement,
    isNullLiteral,
    isUnaryExpression
} = types;


const generateExpression = (expression: types.Expression | types.JSXEmptyExpression | types.BlockStatement | types.Statement | types.Node): string => {
    if (isJSXEmptyExpression(expression)) {
        // Handle JSXEmptyExpression (e.g., <Component />)
        return '';
    }

    if (isJSXElement(expression)){
        return generateJSXElement(expression)
    }

    // console.log("===============================================");
    // console.log("generated : ", expression);
    // console.log("===============================================");

    if (isPrivateName(expression)) {
        console.log("isPrivateName")
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
        console.log("isArgumentPlaceholder")
        return '';  // Ignore ArgumentPlaceholder
    }

    if (isBlockStatement(expression)) {
        const body = expression.body.map(stmt => generateStatement(stmt)).join('\n');
        return `{\n${body}\n}`;
    }

    if (isArrayExpression(expression)) {
        const elements = expression.elements
            .filter(element => element !== null) // Ignorer les éléments null
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

    if (isIdentifier(expression)){
        return `${expression.name}`;
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

    if (isBinaryExpression(expression)) {
        return generateBinaryExpression(expression);
    }

    if (isLogicalExpression(expression)) {
        return generateBinaryExpression(expression);
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

    console.log(expression)
    // Handle other JSX expressions
    throw new Error("Expression not supported");
}



export default generateExpression;