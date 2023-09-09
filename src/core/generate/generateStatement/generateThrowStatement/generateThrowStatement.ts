import { types } from "@babel/core";
import { generate } from "@/core";

export const generateThrowStatement = (statement: types.ThrowStatement): string => {
    const argument = generate(statement.argument);
    return `throw ${argument};`;
};