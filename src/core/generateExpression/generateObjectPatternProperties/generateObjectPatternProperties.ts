import { types } from "@babel/core";
import generateExpression from "../generateExpression";

const {
    isSpreadElement,
    isObjectProperty,
    isStringLiteral,
    isRestElement,
    isIdentifier,
    isExpression
} = types

export const generateObjectPatternProperties = (pattern: types.ObjectPattern): string => {
    return pattern.properties
        .map(prop => {
            if (isObjectProperty(prop)) {
                if ((isIdentifier(prop.key) || isStringLiteral(prop.key)) &&
                    (isIdentifier(prop.value) || isExpression(prop.value))) {
                    const key = isIdentifier(prop.key) ? prop.key.name : prop.key.value;
                    const value = generateExpression(prop.value as types.Expression);
                    return `${key}: ${value}`;
                }

                return '';
            } 
            
            if (isIdentifier(prop.argument)) {
                return `...${prop.argument.name}`;
            }

            return '';
        })
        .filter(Boolean)
        .join(', ');
}