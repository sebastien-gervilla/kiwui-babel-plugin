import { types } from "@babel/core";
import { generate } from "@/core";

const {
    isArgumentPlaceholder,
} = types

export const generateCallExpression = (expression: types.CallExpression) => {
    const callee = generate(expression.callee);
    
    let args = '';
    for (const argument of expression.arguments) {
        if (isArgumentPlaceholder(argument)) { // TODO: Find and remove
            console.warn(`You provided an ArgumentPlaceholder at CallExpression :\n`, expression)
            continue;
        }

        args += `${generate(argument)}, `;
    }

    return `${callee}(${args.slice(0, -2)})`;
}