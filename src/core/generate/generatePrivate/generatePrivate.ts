// Types
import { types } from "@babel/core";
import { AliasMap } from "../generate.types";

// Generation functions
import { generate } from "@/core";
import { generatePrivateName } from "./generatePrivateName";

export const privateGenerator: AliasMap<types.Private> = {
    PrivateName: generatePrivateName
}