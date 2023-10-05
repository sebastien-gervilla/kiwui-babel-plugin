// Types
import { types } from "@babel/core";
import { GeneratorMap } from "../generate.types";

// Generation functions
import { generateObjectProperty } from "./generateObjectProperty";
import { generateClassProperty } from "./generateClassProperty";

export const propertyGenerator: GeneratorMap<types.Property> = {
    ObjectProperty: generateObjectProperty,
    ClassProperty: generateClassProperty,
    ClassPrivateProperty: generateClassProperty
}