import { types } from "@babel/core";
import { generate } from "@/core";

export const generateArrayPattern = (pattern: types.ArrayPattern): string => {
    let elements = '';
    for (const element of pattern.elements) {
        if (element)
            elements += `${generate(element)}, `

        console.warn(`You provided a null in ${pattern}`); // TODO: We let this in testing phase
    }

    return `[${elements.slice(0, -2)}]`;
}