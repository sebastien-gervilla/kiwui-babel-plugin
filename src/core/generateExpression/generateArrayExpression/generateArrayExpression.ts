import { types } from "@babel/core";
import generateExpression from "../generateExpression";

export const generateArrayExpression = (expression : types.ArrayExpression) => {
    const elements = expression.elements
        .filter(element => element !== null) 
        .map(element => generateExpression(element as types.Expression))
        .join(', ');
    return `[${elements}]`;
}