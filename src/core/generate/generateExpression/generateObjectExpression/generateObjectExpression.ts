import { types } from "@babel/core";
import { generateFromArray } from "@/core";
import { isParenthesized } from "@/utils/is";

export const generateObjectExpression = (expression: types.ObjectExpression) => {
    const properties = generateFromArray(expression.properties);
    return isParenthesized(expression)
        ? `({ ${properties} })`
        : `{ ${properties} }`;
};