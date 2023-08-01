import { types } from "@babel/core";
import { generateAttributeValue, generateSpreadAttribute } from "..";

const {
    isJSXIdentifier,
    isJSXAttribute,
    isJSXSpreadAttribute
} = types;

const generateAttributes = (attributes: (types.JSXAttribute | types.JSXSpreadAttribute)[]): string => {
    if (!attributes.length) return 'null';
    let stringAttributes: string[] = [];
  
    for (const attribute of attributes) {
        if (isJSXSpreadAttribute(attribute)) {
            // Handle spread attributes
            const spreadAttribute = generateSpreadAttribute(attribute);
            stringAttributes.push(spreadAttribute);
            continue;
        }
        
        if (isJSXAttribute(attribute)) {
            // Handle regular attributes
            const { name, value } = attribute;
            const attributeName = isJSXIdentifier(name) ? name.name : name.namespace.name + ':' + name.name.name;
            const attributeValue = generateAttributeValue(value);
            stringAttributes.push(`"${attributeName}": ${attributeValue}`);
        }
    }
  
    return `{ ${stringAttributes.join(', ')} }`;
}

export default generateAttributes;