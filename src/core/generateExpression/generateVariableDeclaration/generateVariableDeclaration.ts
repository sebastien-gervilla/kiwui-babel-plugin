import { types } from "@babel/core";
import generateExpression from "../generateExpression";
import { generateObjectPatternProperties } from "../generateObjectPatternProperties";
import { generateArrayPatternElements } from "../generateArrayPatternElement";

const {
    isExpression,
    isObjectPattern,
    isArrayPattern,
    isIdentifier
} = types


export const generateVariableDeclaration = (expression: types.VariableDeclaration): string => {
    return expression.declarations
        .map(declaration => {
            const declarationType = expression.kind;

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

            throw new Error(`Declaration id ${declaration.id} not supported.`);
        })
        .filter(Boolean)
        .join('\n');
}