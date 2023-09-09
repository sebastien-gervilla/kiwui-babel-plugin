import { types } from "@babel/core";
import { generate, generateFromArray } from "@/core";
import { isFirstCharacterUppercase } from "@/utils/utils";
import { JSX_PRAGMA } from "@/plugins/transform-jsx.plugin";

const {
    isJSXIdentifier,
    isJSXMemberExpression
} = types;

export const generateJSXElement = (element: types.JSXElement): string => {
    const { openingElement } = element; // TODO: generateOpeningElement function
    const generatedAttributes = generateFromArray(openingElement.attributes);
    const attributes = generatedAttributes ? `{ ${generatedAttributes} }` : 'null'; // TODO: Should generateFromArray return null if empty ?
    
    const children = generateFromArray(element.children);

    const elementType = openingElement.name;
    if (isJSXIdentifier(elementType)) {
        const elementName = elementType.name;
        const type = isFirstCharacterUppercase(elementName) 
            ? `${elementName}` 
            : `"${elementName}"`;
    
        return getCreateFunction(type, attributes, children);
    }

    if (isJSXMemberExpression(elementType)){
        const memberExpression = generate(elementType);
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