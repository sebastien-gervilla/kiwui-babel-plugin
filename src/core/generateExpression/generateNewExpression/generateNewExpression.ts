import { types } from "@babel/core";
import generateExpression from "../generateExpression";


export const generateNewExpression = (expression : types.NewExpression) => {
    const callee = generateExpression(expression.callee);
    const argumentsList = expression.arguments.map(arg => generateExpression(arg)).join(', ');
    return `new ${callee}(${argumentsList})`;
}