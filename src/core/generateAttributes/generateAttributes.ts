import { types } from "@babel/core";
import { generateAttributeValue, generateSpreadAttribute } from "..";

const {
    isJSXIdentifier,
    isJSXAttribute,
    isJSXSpreadAttribute
} = types;

const generateAttributes = (attributes: (types.JSXAttribute | types.JSXSpreadAttribute)[]): string => {
    if (!attributes.length) return 'null';
    const attributeObjects: string[] = [];
  
    for (const attr of attributes) {
        if (isJSXSpreadAttribute(attr)) {
            // Handle spread attributes
            const spreadAttribute = generateSpreadAttribute(attr);
            attributeObjects.push(spreadAttribute);
        } else if (isJSXAttribute(attr)) {
            // Handle regular attributes
            const { name, value } = attr;
            const attributeName = isJSXIdentifier(name) ? name.name : name.namespace.name + ':' + name.name.name;
            const attributeValue = generateAttributeValue(value);
            attributeObjects.push(`"${attributeName}": ${attributeValue}`);
        }
    }
  
    return `{ ${attributeObjects.join(', ')} }`;
}

export default generateAttributes;