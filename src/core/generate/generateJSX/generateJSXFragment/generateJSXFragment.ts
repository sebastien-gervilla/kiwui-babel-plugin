import { types } from "@babel/core";
import { generateFromArray } from "@/core";

const generateJSXFragment = (fragment: types.JSXFragment): string => {
    const children = generateFromArray(fragment.children);
    return `[${children}]`;
}

export default generateJSXFragment;