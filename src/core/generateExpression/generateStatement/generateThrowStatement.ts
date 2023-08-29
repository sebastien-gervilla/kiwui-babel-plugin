import { types } from "@babel/core";
import generateExpression from "../generateExpression";

export const generateThrowStatement = (statement: types.ThrowStatement): string => {
    const argument = generateExpression(statement.argument);
    return `throw ${argument};`;
};