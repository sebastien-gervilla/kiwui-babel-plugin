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
            .filter(arg => !isJSXNamespacedName(arg))
            .map(arg => {
                if (isArgumentPlaceholder(arg)) {
                    return '';
                } else if (isExpression(arg)) {
                    return generateExpression(arg);
                } else if (isSpreadElement(arg)) {
                    return `...${generateExpression(arg.argument)}`;
                } else {
                    return '';
                }
            })
            .filter(Boolean) 
            .join(', ');
        return `${callee}(${args})`;
    }
    return ''
}