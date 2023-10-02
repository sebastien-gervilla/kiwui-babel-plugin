// Types
import { types } from "@babel/core";
import { AliasMap } from "../generate.types";

// Generation functions
import { generateRegExpLiteral } from "./generateRegExpLiteral";
import { generateTemplateLiteral } from "./generateTemplateLiteral";

// NOTE: All covered.
export const literalGenerator: AliasMap<types.Literal> = {
    StringLiteral: ({ value }) => `\"${value}\"`,
    NumericLiteral: ({ value }) => value.toString(),
    NullLiteral : () => 'null',
    BooleanLiteral: ({ value }) => `${value}`,
    RegExpLiteral: generateRegExpLiteral,
    TemplateLiteral: generateTemplateLiteral,
    BigIntLiteral: ({ value }) => value,
    DecimalLiteral: ({ value }) => value
}