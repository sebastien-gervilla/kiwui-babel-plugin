import { JSX } from "@/helpers"
import { types } from "@babel/core"

export const generateJSXText = (text: types.JSXText) => {
    const purified = JSX.purifyJSXText(text.value);
    return purified
        ? `\"${purified}\"`
        : 'null'; // TODO: this could cause an error
}