import { types } from "@babel/core";
import generateExpression from "../generateExpression";

export const generateUnaryExpression = (expression : types.UnaryExpression) => {
    const argument = generateExpression(expression.argument);
    return `${expression.operator}${argument}`;
}