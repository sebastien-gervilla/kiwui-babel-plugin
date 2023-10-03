// Types
import { types } from "@babel/core";
import { GeneratorMap } from "../generate.types";

// Generation functions
import { generateObjectMethod } from "./generateObjectMethod";
import { generateClassMethod } from "./generateClassMethod";

export const methodGenerator: GeneratorMap<types.Method> = {
    ClassMethod: generateClassMethod,
    ObjectMethod: generateObjectMethod
}