// Types
import { types } from "@babel/core";
import { GeneratorMap } from "../generate.types";

// Generation functions
import { generate } from "@/core";
import { generateObjectProperty } from "./generateObjectProperty";

export const propertyGenerator: GeneratorMap<types.Property> = {
    ObjectProperty: generateObjectProperty
}