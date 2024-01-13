import { types } from "@babel/core";
import { generate } from "@/core";

export const generateArrayExpression = (expression: types.ArrayExpression) => {
    let elements = '';
    for (const element of expression.elements)
        if (element)
            elements += `${generate(element)}, `

    return `[${elements.slice(0, -2)}]`;
};