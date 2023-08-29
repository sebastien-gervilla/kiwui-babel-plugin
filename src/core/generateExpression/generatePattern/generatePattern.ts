import { generateArrayPatternElements } from "../generateArrayPatternElement";
import { generateObjectPatternProperties } from "../generateObjectPatternProperties";
import { types } from "@babel/core";

const {
    isIdentifier,
    isObjectPattern,
    isArrayPattern,
    isPattern
    
} = types

export const generatePattern = (param: types.Identifier | types.Pattern | types.RestElement, init?: types.Expression): any => {
    if (isIdentifier(param)) {
        return param.name;
    }
    
    if (isObjectPattern(param)) {
        return `{ ${generateObjectPatternProperties(param)} }`;
    }
    
    if (isArrayPattern(param)) {
        return `[ ${generateArrayPatternElements(param)} ]`;
    }

    if (isPattern(param))
        throw new Error("Pattern not supported");
    
    return ''
}