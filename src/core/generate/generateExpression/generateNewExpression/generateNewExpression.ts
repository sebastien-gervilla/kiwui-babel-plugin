import { types } from "@babel/core";
import { generate, generateFromArray } from "@/core";

export const generateNewExpression = (expression : types.NewExpression) => {
    const callee = generate(expression.callee);
    const args = generateFromArray(expression.arguments, ', ');

    return `new ${callee}(${args})`;
}