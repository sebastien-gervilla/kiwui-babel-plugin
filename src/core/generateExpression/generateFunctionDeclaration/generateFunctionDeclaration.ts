import { generatePattern } from "../generatePattern";
import { generateStatement } from "../generateStatement";
import { types } from "@babel/core";


export const generateFunctionDeclaration = (declaration: types.FunctionDeclaration): string => {
    const functionName = declaration.id ? declaration.id.name : '';
    const params = declaration.params.map(param => generatePattern(param)).join(', ');
    const body = generateBlockStatement(declaration.body);

    return `function ${functionName}(${params}) ${body}`;
};


const generateBlockStatement = (block: types.BlockStatement, wrapWithBraces: boolean = true): string => {
    const statements = block.body.map(stmt => generateStatement(stmt)).join('\n');
    return wrapWithBraces ? `{\n${statements}\n}` : statements;
}
