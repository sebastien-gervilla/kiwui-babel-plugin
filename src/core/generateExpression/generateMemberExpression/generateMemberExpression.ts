import { types } from "@babel/core";
import generateExpression from "../generateExpression";

const {
    isStringLiteral,
    isPrivateName,
    isIdentifier
} = types


export const generateMemberExpression = (expression: types.MemberExpression): string => {
    const object = generateExpression(expression.object);
    
    if (isIdentifier(expression.property)) {
        return `${object}.${expression.property.name}`;
    } else if (isStringLiteral(expression.property)) {
        return `${object}["${expression.property.value}"]`;
    } else if (!isPrivateName(expression.property)) {
        return `${object}[${generateExpression(expression.property)}]`;
    }
    
    return object; // Ignore PrivateName
}