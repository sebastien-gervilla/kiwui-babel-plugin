import { types } from "@babel/core";
import { generate } from "@/core";

export const generateArrayPattern = (pattern: types.ArrayPattern): string => {
    let elements = '';
    for (const element of pattern.elements)
        if (element)
            elements += `${generate(element)}, `

    return `[${elements.slice(0, -2)}]`;
}