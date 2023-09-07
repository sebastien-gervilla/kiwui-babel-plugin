import { generateArrayPatternElements } from "../generateArrayPatternElement";
import { generateObjectPatternProperties } from "../generateObjectPatternProperties";
import { types } from "@babel/core";
import { generateRestElement } from "../generateRestElement";

const {
    isIdentifier,
    isObjectPattern,
    isArrayPattern,
    isPattern,
    isRestElement
} = types

export const generatePattern = (pattern: types.Identifier | types.Pattern | types.RestElement, init?: types.Expression): any => {
    if (isIdentifier(pattern))
        return pattern.name;
    
    if (isObjectPattern(pattern))
        return `{ ${generateObjectPatternProperties(pattern)} }`;
    
    if (isArrayPattern(pattern))
        return `[ ${generateArrayPatternElements(pattern)} ]`;

    if (isRestElement(pattern))
        return generateRestElement(pattern);

    throw new Error("Assignment pattern not supported");
}