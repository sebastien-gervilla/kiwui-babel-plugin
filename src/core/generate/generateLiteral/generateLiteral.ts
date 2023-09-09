// Types
import { types } from "@babel/core";
import { AliasMap } from "../generate.types";

// Generation functions

export const literalGenerator: AliasMap<types.Literal> = {
    BooleanLiteral: (expression) => expression.value ? 'true' : 'false', // TODO: Don't conditionally check the value ? (could he in expression object)
    NumericLiteral: (expression) => expression.value.toString(),
    NullLiteral : () => 'null',
    StringLiteral: (expression) => `\"${expression.value}\"`,
}