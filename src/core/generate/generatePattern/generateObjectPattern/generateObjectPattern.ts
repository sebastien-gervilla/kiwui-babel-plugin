import { types } from "@babel/core";
import { generateFromArray } from "@/core";

export const generateObjectPattern = (pattern: types.ObjectPattern): string => 
    `{ ${generateFromArray(pattern.properties)} }`;