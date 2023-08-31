import { types } from "@babel/core";
import generateExpression from "../generateExpression";

export const generateConditionalExpression = (expression : types.ConditionalExpression) => {
    const test = generateExpression(expression.test);
    const consequent = generateExpression(expression.consequent);
    const alternate = generateExpression(expression.alternate);
    return `${test} ? ${consequent} : ${alternate}`;
}