// Types
import { types } from "@babel/core";
import { AliasMap } from "../generate.types";

// Generation functions
import { generateRegExpLiteral } from "./generateRegExpLiteral";
import { generateTemplateLiteral } from "./generateTemplateLiteral";

export const literalGenerator: AliasMap<types.Literal> = {
    StringLiteral: (expression) => `\"${expression.value}\"`,
    NumericLiteral: (expression) => expression.value.toString(),
    NullLiteral : () => 'null',
    BooleanLiteral: (expression) => expression.value ? 'true' : 'false', // TODO: Don't conditionally check the value ? (could he in expression object)
    RegExpLiteral: generateRegExpLiteral,
    TemplateLiteral: generateTemplateLiteral
}