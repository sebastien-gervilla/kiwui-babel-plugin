// Types
import { types } from "@babel/core";
import { GeneratorMap } from "../generate.types";

// Generation functions
import { generate } from "@/core";

export const standardizedGenerator: GeneratorMap<types.Standardized> = {
    RestElement: ({ argument }) => `...${generate(argument)}`,
    SpreadElement: ({ argument }) => `...${generate(argument)}`,
    TemplateElement: ({ value }) => value.raw,
}