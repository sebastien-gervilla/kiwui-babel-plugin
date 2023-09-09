import { types } from "@babel/core";
import { generateFromArray } from "@/core";

export const generateObjectExpression = (expression: types.ObjectExpression) => {
    const properties = generateFromArray(expression.properties);
    console.log('prtops', expression.properties);
    console.log('properties', properties);
    
    return `{ ${properties} }`;
}