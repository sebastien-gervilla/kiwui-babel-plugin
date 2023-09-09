import { types } from "@babel/core";
import { generate } from "@/core";

export const generateUnaryExpression = (expression : types.UnaryExpression) => {
    const argument = generate(expression.argument);
    return `${expression.operator}${argument}`;
}