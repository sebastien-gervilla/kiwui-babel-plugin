import { types } from "@babel/core";
import generateExpression from "../generateExpression";

const {
    isSpreadElement,
    isObjectProperty,
    isStringLiteral,
    isRestElement,
    isIdentifier
} = types

export const generateObjectPatternProperties = (pattern: types.ObjectPattern): string => {
    return pattern.properties
        .map(prop => {
            if (isSpreadElement(prop)) {
                // if (isIdentifier(prop.argument)) {
                //     return `...${prop.argument.name}`;
                // } else if (isArrayExpression(prop.argument )) {
                //     const elements = prop.argument.elements
                //         .map(element => {
                //             if (isIdentifier(element)) {
                //                 return element.name;
                //             }
                //             return '';
                //         })
                //         .filter(Boolean)
                //         .join(', ');
                //     return `...[${elements}]`;
                // }
                return '';
            } else if (isObjectProperty(prop)) {
                if (isIdentifier(prop.key) || isStringLiteral(prop.key)) {
                    const key = isIdentifier(prop.key) ? prop.key.name : prop.key.value;
                    const value = generateExpression(prop.value as types.Expression);
                    return `${key}: ${value}`;
                }
            } else if (isRestElement(prop)) {
                if (isIdentifier(prop.argument)) {
                    return `...${prop.argument.name}`;
                }
                return '';
            }
            return '';
        })
        .filter(Boolean)
        .join(', ');
}