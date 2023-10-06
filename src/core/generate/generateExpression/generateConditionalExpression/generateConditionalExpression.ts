import { types } from "@babel/core";
import { generate } from "@/core";

export const generateConditionalExpression = (expression : types.ConditionalExpression) => {
    const test = generate(expression.test);
    const consequent = generate(expression.consequent);
    const alternate = generate(expression.alternate);
    return `${test} ? ${consequent} : ${alternate}`;
}