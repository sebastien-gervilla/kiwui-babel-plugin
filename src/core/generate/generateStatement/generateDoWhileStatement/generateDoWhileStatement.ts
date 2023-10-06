import { types } from "@babel/core";
import { generate } from "@/core";


export const generateDoWhileStatement = (expression: types.DoWhileStatement): string => {
    const body = generate(expression.body);
    const test = generate(expression.test);

    return `do ${body} while (${test})`;
}