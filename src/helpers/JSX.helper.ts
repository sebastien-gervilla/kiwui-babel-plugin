import { generate } from "@/core";
import { types } from "@babel/core";

export default class JSXHelper {
    static purifyJSXText = (text: string) => {
        return text
            .replace(/(\r\n|\n|\r|\t)/gm,"")
            .trim();
    }

    static generateFromJSXArray = (jsxElements: types.JSX[]) => {
        let stringJsx = '';
        for (const element of jsxElements) {
            const generated = generate(element);
            if (generated) stringJsx += `${generated}, `
        }
        return stringJsx;
    }
}