// Types
import { types } from "@babel/core";
import { AliasMap } from "../generate.types";

// Generation functions
import { generateObjectMethod } from "./generateObjectMethod";
import { generateClassMethod } from "./generateClassMethod";

export const methodGenerator: AliasMap<types.Method> = {
    ClassMethod: generateClassMethod,
    ObjectMethod: generateObjectMethod
}