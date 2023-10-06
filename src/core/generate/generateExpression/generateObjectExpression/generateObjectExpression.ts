import { types } from "@babel/core";
import { generateFromArray } from "@/core";

export const generateObjectExpression = (expression: types.ObjectExpression) =>
    `{ ${generateFromArray(expression.properties)} }`;