import { types } from "@babel/core";
import { jsxPragma } from "../../plugins/main.plugin";
import { isFirstCharacterUppercase } from "../../utils/utils";
import { generateAttributes, generateChildren } from "..";

const { isJSXMemberExpression } = types;

const generateJSXElement = (element: types.JSXElement): string => {
    const { openingElement } = element;
    const attributes = generateAttributes(openingElement.attributes);

    console.log("=============================================================");
    console.log("Main element:", element.openingElement);
    console.log("=============================================================");
    
    
    let transformedJSX = jsxPragma;
    if (isJSXMemberExpression(openingElement.name)) {
        const tagName = openingElement.name.property.name;
        transformedJSX += `(${tagName}, ${attributes}`;
    } else {
        const tagName = openingElement.name.name.toString();
        if (isFirstCharacterUppercase(tagName))
            return `${tagName}, ${attributes}`

        transformedJSX += `("${tagName}", ${attributes}`;
    }

    const children = generateChildren(element.children);
    transformedJSX += children ? `, ${children})` : ')';

    return transformedJSX;
}

export default generateJSXElement;