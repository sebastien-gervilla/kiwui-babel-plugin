import { JSX } from "@/helpers"
import { types } from "@babel/core"

export const generateJSXText = (text: types.JSXText) => {
    
    const purified = JSX.purifyJSXText(text);
    return purified
        ? `"${purified}"`
        : '';
}

// NOTE: We put '' if purified is an empty string.
// It allows us to conditionally check if "children" is empty later on, and if so not rendering it.