import { types } from "@babel/core";
import generateExpression from "../generateExpression";

const {
    isSpreadElement,
    isMemberExpression,
    isJSXNamespacedName,
    isArgumentPlaceholder,
    isIdentifier,
    isExpression
} = types

export const generateCallExpression = (expression : types.CallExpression) => {
    if (isIdentifier(expression.callee) || isMemberExpression(expression.callee)) {
        const callee = generateExpression(expression.callee);
        const args = expression.arguments
            .filter(arg => !isJSXNamespacedName(arg)) // Exclure les JSXNamespacedName et SpreadElement
            .map(arg => {
                if (isArgumentPlaceholder(arg)) {
                    console.log("isCallExpression ----> isArgumentPlaceholder")
                    return '';
                } else if (isExpression(arg)) {
                    return generateExpression(arg);
                } else if (isSpreadElement(arg)) {
                    return `...${generateExpression(arg.argument)}`;
                } else {
                    console.log("isCallExpression ----> else")
                    return '';
                }
            })
            .filter(Boolean) // Filtrer les éléments vides
            .join(', ');
        return `${callee}(${args})`;
    }
    return ''
}