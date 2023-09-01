import { generateBlockStatement } from "../generateBlockStatement";
import { generatePattern } from "../generatePattern";
import { types } from "@babel/core";


export const generateFunctionDeclaration = (declaration: types.FunctionDeclaration): string => {
    const functionName = declaration.id ? declaration.id.name : '';
    const params = declaration.params.map(param => generatePattern(param)).join(', ');
    const body = generateBlockStatement(declaration.body);

    return `function ${functionName}(${params}) ${body}`;
};


