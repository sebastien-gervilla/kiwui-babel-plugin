import { types } from "@babel/core";
import { generate, generateFromArray } from "@/core";
import { isFirstCharacterUppercase } from "@/utils/utils";
import { JSX_PRAGMA } from "@/plugins/transform-jsx.plugin";
import JSXHelper from "@/helpers/JSX.helper";

const { isJSXIdentifier } = types;

export const generateJSXElement = (element: types.JSXElement): string => {
    const { openingElement } = element;
    
    const attributes = `{ ${generateFromArray(openingElement.attributes)} }`;
    const children = JSXHelper.generateFromJSXArray(element.children);

    const name = openingElement.name;
    const type = isJSXIdentifier(name) 
        ? getTypeFromIdentifier(name)
        : generate(name);

    return getCreateFunction(type, attributes, children);
}

const getTypeFromIdentifier = ({ name }: types.JSXIdentifier) => {
    return isFirstCharacterUppercase(name)
        ? `${name}` 
        : `\"${name}\"`;
}

const getCreateFunction = (type: string, attributes: string, children: string | null) => {
    return JSX_PRAGMA + (
        !children
            ? `(${type}, ${attributes})`
            : `(${type}, ${attributes}, ${children})`
    );
}

export default generateJSXElement;