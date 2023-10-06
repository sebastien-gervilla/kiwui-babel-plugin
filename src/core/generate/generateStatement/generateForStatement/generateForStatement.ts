import { types } from "@babel/core";
import { generate } from "@/core";

export const generateForStatement = (expression: types.ForStatement): string => {
    const init = expression.init ? generate(expression.init) : '';
    const test = expression.test ? generate(expression.test) : '';
    const update = expression.update ? generate(expression.update) : '';
    const body = generate(expression.body);
    
    return `for (${init}; ${test}; ${update}) ${body}`;
}