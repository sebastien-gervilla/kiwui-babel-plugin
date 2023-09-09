import { types } from "@babel/core";
import { generate, generateFromArray } from "@/core";


export const generateFunctionDeclaration = (declaration: types.FunctionDeclaration): string => {
    const functionName = declaration.id ? declaration.id.name : '';
    const params = generateFromArray(declaration.params);
    const body = generate(declaration.body);

    return `function ${functionName}(${params}) ${body}`;
};


