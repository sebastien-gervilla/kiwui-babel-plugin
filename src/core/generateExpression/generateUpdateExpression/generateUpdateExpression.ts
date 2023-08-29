import { types } from "@babel/core";
import generateExpression from "../generateExpression";

export const generateUpdateExpression = (expression : types.UpdateExpression) => {
    const argument = generateExpression(expression.argument);
    const operator = expression.operator;
    if (expression.prefix) {
        return `${operator}${argument}`;
    } else {
        return `${argument}${operator}`;
    }
}