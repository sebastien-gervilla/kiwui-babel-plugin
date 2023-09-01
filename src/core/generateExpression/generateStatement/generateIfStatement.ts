import { types } from "@babel/core";
import generateExpression from "../generateExpression";
import { generateStatement } from "./generateStatement";


export const generateIfStatement = (expression: types.IfStatement): string => {
    const test = generateExpression(expression.test);
    const consequent = generateStatement(expression.consequent);
    const alternate = expression.alternate ? generateStatement(expression.alternate) : '';
    
    return `if (${test}) ${consequent}${alternate ? ` else ${alternate}` : ''}`;
}