import { types } from "@babel/core";
import generateExpression from "../generateExpression";

const {

} = types


export const generateAwaitExpression = (expression : types.AwaitExpression) => {
    return `await ${generateExpression(expression.argument)}`;
}