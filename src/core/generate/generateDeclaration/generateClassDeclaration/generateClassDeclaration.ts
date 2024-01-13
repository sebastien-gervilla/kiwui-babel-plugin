import { types } from "@babel/core";
import { generate } from "@/core";

export const generateClassDeclaration = (declaration: types.ClassDeclaration) => {
    const superClass = declaration.superClass 
        ? `extends ${generate(declaration.superClass)} ` 
        : '';

    const className = declaration.id
        ? declaration.id.name 
        : '';

    const body = generate(declaration.body);

    return `class ${className} ${superClass}{\n${body}\n}`;
}