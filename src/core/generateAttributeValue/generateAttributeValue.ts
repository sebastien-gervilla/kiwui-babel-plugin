import { types } from "@babel/core";
import { generateExpression, generateJSXElement, generateJSXFragment } from "..";

const { 
    isJSXElement,
    isJSXFragment,
    isStringLiteral,
    isJSXEmptyExpression,
    isJSXExpressionContainer
} = types;

const generateAttributeValue = (value: types.JSXAttribute['value']): string => {
    if (isJSXExpressionContainer(value))
        return !isJSXEmptyExpression(value.expression) 
            ? generateExpression(value.expression) 
            : 'null';
  
    if (isJSXElement(value))
        return generateJSXElement(value);
  
    if (isJSXFragment(value))
        return generateJSXFragment(value);
  
    return isStringLiteral(value) 
        ? `"${value.value}"` 
        : `"${value}"`;
}

export default generateAttributeValue;