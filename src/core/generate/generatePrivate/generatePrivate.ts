// Types
import { types } from "@babel/core";
import { GeneratorMap } from "../generate.types";

// Generation functions
import { generate } from "@/core";
import { generatePrivateName } from "./generatePrivateName";

export const privateGenerator: GeneratorMap<types.Private> = {
    PrivateName: generatePrivateName
}