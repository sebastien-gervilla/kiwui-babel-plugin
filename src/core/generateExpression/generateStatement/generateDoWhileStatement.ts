import { types } from "@babel/core";
import generateExpression from "../generateExpression";
import { generateStatement } from "./generateStatement";


export const generateDoWhileStatement = (expression: types.DoWhileStatement): string => {
    const body = generateStatement(expression.body);
    const test = generateExpression(expression.test);

    return `do ${body} while (${test})`;
}