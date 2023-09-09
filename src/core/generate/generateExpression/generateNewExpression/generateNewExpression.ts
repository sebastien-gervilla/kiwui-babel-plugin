import { types } from "@babel/core";
import { generate } from "@/core";

const {
    isArgumentPlaceholder
} = types;

export const generateNewExpression = (expression : types.NewExpression) => {
    const callee = generate(expression.callee);
    
    let args = '';
    for (const argument of expression.arguments) {
        if (!isArgumentPlaceholder(argument))
            args += `${generate(argument)}, `;

        console.warn(`Placeholder found: \n ${argument}`); // TODO: Remove
    }

    return `new ${callee}(${args.slice(0, -2)})`;
}