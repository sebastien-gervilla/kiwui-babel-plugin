import { types } from "@babel/core";
import { generate } from "@/core";

export const generateUnaryExpression = (expression : types.UnaryExpression) => {
    const argument = generate(expression.argument);

    // NOTE: !x will give ! x, which doesn't matter.
    // It helps us not checking for every operator.
    return `${expression.operator} ${argument}`;
}