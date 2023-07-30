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
    if (isJSXExpressionContainer(value)) {
        // Handle JSX expression in attributes
        return isJSXEmptyExpression(value.expression) ? 'null' : generateExpression(value.expression);
    }
  
    if (isJSXElement(value)) {
      // Handle JSX element as attribute value
      return generateJSXElement(value);
    }
  
    if (isJSXFragment(value)) {
      // Handle JSX fragment as attribute value
      return generateJSXFragment(value);
    }
  
    // Handle literal values (e.g., strings, numbers, booleans)
    return isStringLiteral(value) ? `"${value.value}"` : `"${value}"`;
}

export default generateAttributeValue;