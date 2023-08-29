import { types } from "@babel/core";
import generateExpression from "../generateExpression";

const {
    isStringLiteral,
    isPrivateName,
    isIdentifier,
    isNumericLiteral
} = types


export const generateMemberExpression = (expression: types.MemberExpression): string => {
    const object = generateExpression(expression.object);

    if (isIdentifier(expression.property) || isNumericLiteral(expression.property)) {
        if (expression.computed || isNumericLiteral(expression.property)) {
            return `${object}[${generateExpression(expression.property)}]`;
        } else {
            return `${object}.${expression.property.name}`;
        }
    } else if (isStringLiteral(expression.property)) {
        return `${object}["${expression.property.value}"]`;
    } else if (!isPrivateName(expression.property)) {
        return `${object}[${generateExpression(expression.property)}]`;
    }

    return object; // Ignore PrivateName
}