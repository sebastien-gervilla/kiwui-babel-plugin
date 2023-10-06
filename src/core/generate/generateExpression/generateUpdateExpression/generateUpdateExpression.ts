import { types } from "@babel/core";
import { generate } from "@/core";

export const generateUpdateExpression = (expression: types.UpdateExpression) => {
    const argument = generate(expression.argument);
    const operator = expression.operator;

    return expression.prefix
        ? `${operator}${argument}`
        : `${argument}${operator}`;
}