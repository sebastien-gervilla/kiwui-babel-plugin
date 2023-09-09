// Types
import { types } from "@babel/core";
import { AliasMap } from "../generate.types";

// Generation functions
import { generateObjectMethod } from "./generateObjectMethod";

export const methodGenerator: AliasMap<types.Method> = {
    ObjectMethod: generateObjectMethod
}