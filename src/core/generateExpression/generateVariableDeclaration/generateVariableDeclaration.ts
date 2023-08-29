import { types } from "@babel/core";
import generateExpression from "../generateExpression";
import { generateObjectPatternProperties } from "../generateObjectPatternProperties";
import { generateArrayPatternElements } from "../generateArrayPatternElement";

const {
    isExpression,
    isVariableDeclaration,
    isVariableDeclarator,
    isObjectPattern,
    isArrayPattern,
    isIdentifier
} = types


export const generateVariableDeclaration = (expression: types.VariableDeclaration): string => {
    if (isVariableDeclaration(expression)) {
        const declarations = expression.declarations
            .map(declaration => {
                if (isVariableDeclarator(declaration)) {
                    const declarationType = expression.kind || 'const'; // Default to 'const' if no kind is provided
                    if (isObjectPattern(declaration.id)) {
                        const properties = generateObjectPatternProperties(declaration.id);
                        const initValue = declaration.init && isExpression(declaration.init) ? ` = ${generateExpression(declaration.init)}` : '';
                        return `${declarationType} { ${properties} }${initValue}`;
                    } else if (isArrayPattern(declaration.id)) {
                        const elements = generateArrayPatternElements(declaration.id);
                        const initValue = declaration.init && isExpression(declaration.init) ? ` = ${generateExpression(declaration.init)}` : '';
                        return `${declarationType} [${elements}]${initValue}`;
                    } else if (isIdentifier(declaration.id)) {
                        const initValue = declaration.init && isExpression(declaration.init) ? ` = ${generateExpression(declaration.init)}` : '';
                        return `${declarationType} ${declaration.id.name}${initValue}`;
                    }
                }
                return '';
            })
            .filter(Boolean)
            .join('\n');
        return declarations;
    }
    return '';
}