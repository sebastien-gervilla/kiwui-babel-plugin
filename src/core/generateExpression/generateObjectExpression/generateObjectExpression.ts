import { types } from "@babel/core";
import generateExpression from "../generateExpression";

const {
    isExpression,
    isObjectProperty,
    isIdentifier,
    isStringLiteral
} = types


export const generateObjectExpression = (expression : types.ObjectExpression) => {
    const properties = expression.properties.map(prop => {
        if (isObjectProperty(prop)) {
            if (isIdentifier(prop.key) || isStringLiteral(prop.key)) {
                const key = isIdentifier(prop.key) ? prop.key.name : prop.key.value;

                let value = '';
                if (isExpression(prop.value)) {
                    value = generateExpression(prop.value);
                } else {
                    // Traitez les cas où prop.value n'est pas une expression valide
                }
                return `${key}: ${value}`;
            }
        }
        return '';
    }).filter(Boolean).join(', ');
    return `{ ${properties} }`;
}