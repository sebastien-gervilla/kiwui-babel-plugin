import { types } from "@babel/core";
import { generateExpression, generateJSXElement, generateJSXFragment } from "..";
import { JSX } from "../../helpers";

const {
    isJSXText,
    isJSXElement,
    isJSXFragment,
    isJSXExpressionContainer,
    isArrayExpression
} = types;

const generateChildren = (children: types.JSXFragment['children'] | types.JSXElement['children']): string | null => {
    if (!children.length) return null;

    // Handle JSX children
    const stringChildren = children.map(child => {
        if (isJSXElement(child))
            return generateJSXElement(child);

        if (isJSXText(child)) {
            const purified = JSX.purifyJSXText(child.value);
            return purified ? `\"${purified}\"` : null;
        }

        if (isJSXExpressionContainer(child))
            return generateExpression(child.expression);
        
        if (isJSXFragment(child))
            return generateJSXFragment(child);
        
        // Spread child, rarest
        if (isArrayExpression(child.expression))
            return `...${child.expression.elements}`;

        throw new Error("Spread children must be an array.")
    }).filter(Boolean);

    if (!stringChildren.length)
        return null;
  
    return stringChildren.join(', ');
}

export default generateChildren;