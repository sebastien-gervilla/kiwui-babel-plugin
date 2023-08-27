import { types } from "@babel/core";
import generateExpression from "../generateExpression";
import { generateStatement } from "./generateStatement";

const {
    isVariableDeclaration,
    isIdentifier,
    isObjectPattern,
    isArrayPattern
} = types

export const generateForInStatement = (statement: types.ForInStatement): string => {
    const left = generateExpression(statement.left);
    const right = generateExpression(statement.right);
    const body = generateStatement(statement.body);
    
    return `for (${left} in ${right}) ${body}`;
};