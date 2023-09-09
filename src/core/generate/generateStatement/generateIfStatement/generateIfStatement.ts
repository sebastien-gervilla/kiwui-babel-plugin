import { types } from "@babel/core";
import { generate } from "@/core";


export const generateIfStatement = (expression: types.IfStatement): string => {
    const test = generate(expression.test);
    const consequent = generate(expression.consequent);
    const alternate = expression.alternate ? generate(expression.alternate) : '';
    
    return `if (${test}) ${consequent}${alternate ? ` else ${alternate}` : ''}`;
}