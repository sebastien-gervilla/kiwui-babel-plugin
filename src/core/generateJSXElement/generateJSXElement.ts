import { types } from "@babel/core";
import { JSX_PRAGMA } from "../../plugins/transform-jsx.plugin";
import { isFirstCharacterUppercase } from "../../utils/utils";
import { generateAttributes, generateChildren } from "..";
import { generateJSXMemberExpression } from "../generateJSXMemberExpression";

const {
    isJSXIdentifier,
    isJSXMemberExpression
} = types;

const generateJSXElement = (element: types.JSXElement): string => {
    const { openingElement } = element;
    const attributes = generateAttributes(openingElement.attributes);
    const children = generateChildren(element.children);

    const elementType = openingElement.name;
    if (isJSXIdentifier(elementType)) {
        const elementName = elementType.name;
        const type = isFirstCharacterUppercase(elementName) 
            ? `${elementName}` 
            : `"${elementName}"`;
    
        return getCreateFunction(type, attributes, children);
    }

    if (isJSXMemberExpression(elementType)){
        const memberExpression = generateJSXMemberExpression(elementType);
        return getCreateFunction(memberExpression, attributes, children);
    }

    throw new Error("Namespaces are currently not supported.");
}

const getCreateFunction = (type: string, attributes: string, children: string | null) => {
    return JSX_PRAGMA + (
        !children
            ? `(${type}, ${attributes})`
            : `(${type}, ${attributes}, ${children})`
    );
}

export default generateJSXElement;