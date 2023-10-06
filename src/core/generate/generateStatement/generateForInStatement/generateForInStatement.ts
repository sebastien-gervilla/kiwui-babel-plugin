import { types } from "@babel/core";
import { generate } from "@/core";

export const generateForInStatement = (statement: types.ForInStatement): string => {
    const left = generate(statement.left);
    const right = generate(statement.right);
    const body = generate(statement.body);
    
    return `for (${left} in ${right}) ${body}`;
};