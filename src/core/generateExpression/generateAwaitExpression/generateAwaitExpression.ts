import { types } from "@babel/core";
import generateExpression from "../generateExpression";

export const generateAwaitExpression = (expression : types.AwaitExpression) => {
    return `await ${generateExpression(expression.argument)}`;
}