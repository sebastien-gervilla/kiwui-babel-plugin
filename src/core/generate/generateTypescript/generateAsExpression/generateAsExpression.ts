import { types } from "@babel/core";
import { generate } from "@/core";

export const generateAsExpression = (expression: types.TSAsExpression): string => {
    // const test = generate(expression.test);
    // const body = generate(expression.body);
    // return `while (${test}) ${body}`;
    return ''
}