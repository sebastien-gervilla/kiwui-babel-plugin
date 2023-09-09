import { types } from "@babel/core";
import { generate } from "@/core";

export const generateArrayExpression = (expression: types.ArrayExpression) => {
    let elements = '';
    for (const element of expression.elements) { // TODO: use generateFromArray
        if (!element) { // TODO: Remove
            console.warn(`You provided a null value at ArrayExpression :\n`, expression)
            continue;
        }
        
        elements += generate(element) + ', '
    }

    return `[${elements.slice(0, -2)}]`;
};