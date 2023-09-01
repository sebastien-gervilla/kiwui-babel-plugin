import { types } from "@babel/core";
import generateExpression from "../generateExpression";
import { generateStatement } from "./generateStatement";


export const generateForStatement = (expression: types.ForStatement): string => {
    const init = expression.init ? generateExpression(expression.init) : '';
    const test = expression.test ? generateExpression(expression.test) : '';
    const update = expression.update ? generateExpression(expression.update) : '';
    const body = generateStatement(expression.body);
    
    return `for (${init}; ${test}; ${update}) ${body}`;
}