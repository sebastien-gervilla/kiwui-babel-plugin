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
            if (types.isObjectProperty(prop)) {
                const key = types.isIdentifier(prop.key)
                  ? prop.key.name
                  : types.isStringLiteral(prop.key)
                  ? prop.key.value
                  : "";
        
                if (types.isAssignmentPattern(prop.value)) {
                  const defaultValue = generateExpression(prop.value.right);
                  return `${key} = ${defaultValue}`;
                } else {
                  const value = generateExpression(prop.value);
                  return `${key}: ${value}`;
                }
            }
            
            if (isIdentifier(prop.argument)) {
                return `...${prop.argument.name}`;
            }

            return '';
        })
        .filter(Boolean)
        .join(', ');
}