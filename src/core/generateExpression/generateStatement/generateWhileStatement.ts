import { types } from "@babel/core";
import generateExpression from "../generateExpression";
import { generateStatement } from "./generateStatement";


export const generateWhileStatement = (expression: types.WhileStatement): string => {
    const test = generateExpression(expression.test);
    const body = generateStatement(expression.body);

    return `while (${test}) ${body}`;
}