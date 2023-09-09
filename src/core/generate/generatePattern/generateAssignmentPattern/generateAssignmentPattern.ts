import { types } from "@babel/core";
import { generate } from "@/core";

export const generateAssignmentPattern = (pattern: types.AssignmentPattern) => {
    const left = generate(pattern.left);
    const right = generate(pattern.right);

    return `${left} = ${right}`;
}