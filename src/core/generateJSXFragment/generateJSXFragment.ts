import { types } from "@babel/core";
import { generateChildren } from "..";

const generateJSXFragment = (fragment: types.JSXFragment): string => {
    const children = generateChildren(fragment.children);
    return `[${children}]`;
}

export default generateJSXFragment;