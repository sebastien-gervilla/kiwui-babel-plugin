import { types } from "@babel/core";
import { JSX_PRAGMA } from "../../plugins/transform-jsx.plugin";
import { isFirstCharacterUppercase } from "../../utils/utils";
import { generateAttributes, generateChildren } from "..";

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

    // TODO: Support these
    if (isJSXMemberExpression(elementType))
        throw new Error("Member expressions are currently not supported.");

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