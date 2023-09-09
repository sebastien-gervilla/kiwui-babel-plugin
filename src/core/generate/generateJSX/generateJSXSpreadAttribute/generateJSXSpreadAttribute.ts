import { types } from "@babel/core";
import { generate } from "@/core";

export const generateJSXSpreadAttribute = (attribute: types.JSXSpreadAttribute) => {
    const expressionString = generate(attribute.argument);
    return `{ ...${expressionString} }`;
}