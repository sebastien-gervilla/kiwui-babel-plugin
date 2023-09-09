import { types } from "@babel/core";
import { generate } from "@/core";

export const generateAwaitExpression = (expression: types.AwaitExpression) => `await ${generate(expression.argument)}`;