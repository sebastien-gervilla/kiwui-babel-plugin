import { types } from "@babel/core";
import { generateFromArray } from "@/core";

export const generateVariableDeclaration = (expression: types.VariableDeclaration): string => {
    const declarations = generateFromArray(expression.declarations);
    return `${expression.kind} ${declarations}`;
}