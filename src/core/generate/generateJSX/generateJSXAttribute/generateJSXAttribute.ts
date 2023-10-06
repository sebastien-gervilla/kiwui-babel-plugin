import { types } from "@babel/core";
import { generate } from "@/core";

export const generateJSXAttribute = (attribute: types.JSXAttribute) => {
    const { name, value } = attribute;
    const attributeName = generate(name);
        
    const attributeValue = value 
        ? generate(value)
        : `${value}`;
    
    return `\"${attributeName}\": ${attributeValue}`;
}