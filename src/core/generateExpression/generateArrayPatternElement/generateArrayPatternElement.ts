import { types } from "@babel/core";
import generateExpression from "../generateExpression";

const {
    isIdentifier
} = types


export const generateArrayPatternElements = (pattern: types.ArrayPattern): string => {
    return pattern.elements
        .map(element => {
            if (element && isIdentifier(element)) {
                return element.name;
            }
            return '';
        })
        .filter(Boolean)
        .join(', ');
}