import { types } from "@babel/core";
import { generateExpression, generateJSXElement, generateJSXFragment } from "..";
import { JSX } from "../../helpers";

const {
    isJSXText,
    isJSXElement,
    isJSXFragment,
    isJSXExpressionContainer
} = types;

const generateChildren = (children: types.Node[]): string | null => {
    if (!children.length) return null;

    // Handle JSX children
    const childrenStrings = children.map(child => {
        if (isJSXText(child)) {
            const purified = JSX.purifyJSXText(child.value);
            return purified ? `\"${purified}\"` : null;
        }

        if (isJSXExpressionContainer(child))
            return generateExpression(child.expression);
            
        if (isJSXElement(child)) {
            return generateJSXElement(child);
        } else if (isJSXFragment(child)) {
            return generateJSXFragment(child);
        }

        return ''; // TODO: filter to prevent this
    }).filter(Boolean);

    if (!childrenStrings.length)
        return null;
  
    return childrenStrings.join(', ');
}

export default generateChildren;