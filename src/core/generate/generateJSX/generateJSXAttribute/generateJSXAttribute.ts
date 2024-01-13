import { types } from "@babel/core";
import { generate } from "@/core";

export const generateJSXAttribute = (attribute: types.JSXAttribute) => {
    const { name, value } = attribute;
    const attributeName = generate(name);

    const attributeValue = value 
        ? generate(value)
        : 'true';
    
    return `\"${attributeName}\": ${attributeValue}`;
}

// NOTE: If the value is null or undefined, we serve it as true.
// This allows for: <Component vertical />
// To get: { 'vertical': true }