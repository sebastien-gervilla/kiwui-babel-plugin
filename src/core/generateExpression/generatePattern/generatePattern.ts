import { generateArrayPatternElements } from "../generateArrayPatternElement";
import { generateObjectPatternProperties } from "../generateObjectPatternProperties";
import { types } from "@babel/core";

const {
    isIdentifier,
    isObjectPattern,
    isArrayPattern
    
} = types

export const generatePattern = (param: types.Identifier | types.Pattern | types.RestElement, init?: types.Expression): any => {
    if (isIdentifier(param)) {
        return param.name;
    } else if (isObjectPattern(param)) {
        return `{ ${generateObjectPatternProperties(param)} }`;
    } else if (isArrayPattern(param)) {
        return `[ ${generateArrayPatternElements(param)} ]`;
    } else {
        return '';
    }
}