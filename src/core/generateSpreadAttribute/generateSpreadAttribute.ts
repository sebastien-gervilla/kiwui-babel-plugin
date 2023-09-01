import { types } from "@babel/core";
import { generateExpression } from "..";

const generateSpreadAttribute = (attributes: types.JSXSpreadAttribute): string => {
    const expressionString = generateExpression(attributes.argument);
    return `{ ...${expressionString} }`;
}

export default generateSpreadAttribute;