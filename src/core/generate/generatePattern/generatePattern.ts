// Types
import { types } from "@babel/core";
import { AliasMap } from "../generate.types";

// Generation functions
import { generateAssignmentPattern } from "./generateAssignmentPattern";
import { generateArrayPattern } from "./generateArrayPattern";
import { generateObjectPattern } from "./generateObjectPattern";

// NOTE: All covered.
export const patternGenerator: AliasMap<types.Pattern> = {
    AssignmentPattern: generateAssignmentPattern,
    ArrayPattern: generateArrayPattern,
    ObjectPattern: generateObjectPattern
}