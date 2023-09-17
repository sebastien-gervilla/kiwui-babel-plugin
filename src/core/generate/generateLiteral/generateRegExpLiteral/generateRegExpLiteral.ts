import { types } from "@babel/core";

export const generateRegExpLiteral = (literal: types.RegExpLiteral) =>
    literal.pattern + literal.flags