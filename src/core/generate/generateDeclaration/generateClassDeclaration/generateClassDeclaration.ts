import { types } from "@babel/core";
import { generate } from "@/core";

export const generateClassDeclaration = (declaration: types.ClassDeclaration) => {
    const superClass = declaration.superClass 
        ? `extends ${generate(declaration.superClass)} ` 
        : '';

    const body = generate(declaration.body);

    return `class ${declaration.id.name} ${superClass}{\n${body}\n}`;
}