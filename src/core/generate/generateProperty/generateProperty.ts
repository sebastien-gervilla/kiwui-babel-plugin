// Types
import { types } from "@babel/core";
import { AliasMap } from "../generate.types";

// Generation functions
import { generate } from "@/core";
import { generateObjectProperty } from "./generateObjectProperty";

export const propertyGenerator: AliasMap<types.Property> = {
    ObjectProperty: generateObjectProperty
}