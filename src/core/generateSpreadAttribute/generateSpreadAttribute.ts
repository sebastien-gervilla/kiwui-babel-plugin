import { types } from "@babel/core";
import { generateExpression } from "..";

const generateSpreadAttribute = (attr: types.JSXSpreadAttribute): string => {
    // Handle spread attributes
    const expressionString = generateExpression(attr.argument);
    return `{ ...${expressionString} }`;
}

export default generateSpreadAttribute;