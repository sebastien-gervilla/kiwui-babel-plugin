export default class JSXHelper {
    static purifyJSXText = (text: string) => {
        return text
            .replace(/(\r\n|\n|\r|\t)/gm,"")
            .trim();
    }
}