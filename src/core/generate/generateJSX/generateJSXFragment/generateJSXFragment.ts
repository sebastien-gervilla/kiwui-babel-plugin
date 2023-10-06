import { types } from "@babel/core";
import JSXHelper from "@/helpers/JSX.helper";

const generateJSXFragment = (fragment: types.JSXFragment): string => {
    const children = JSXHelper.generateFromJSXArray(fragment.children);
    return children ? `[${children}]` : ''; // TODO: Should we ...[children] ?
}

export default generateJSXFragment;