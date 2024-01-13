import { generate } from "@/core";
import { types } from "@babel/core";

export default class JSXHelper {
    static purifyJSXTextz = (text: types.JSXText) => {
        return text.value
            .replace(/(\r\n|\n|\r|\t)/gm, "")
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .trim();
    }

    static purifyJSXText = (text: types.JSXText) => {
        const lines = text.value.split(/\r\n|\n|\r/);
      
        let lastNonEmptyLine = 0;
      
        for (let i = 0; i < lines.length; i++)
            if (lines[i].match(/[^ \t]/))
                lastNonEmptyLine = i;
      
        let purifiedText = "";

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
        
            const isFirstLine = i === 0;
            const isLastLine = i === lines.length - 1;
            const isLastNonEmptyLine = i === lastNonEmptyLine;
        
            // replace rendered whitespace tabs with spaces
            let trimmedLine = line.replace(/\t/g, " ");
        
            // trim whitespace touching a newline
            if (!isFirstLine)
                trimmedLine = trimmedLine.replace(/^[ ]+/, "");
      
            // trim whitespace touching an endline
            if (!isLastLine)
                trimmedLine = trimmedLine.replace(/[ ]+$/, "");
      
            if (trimmedLine) {
                if (!isLastNonEmptyLine)
                    trimmedLine += " ";
        
                purifiedText += trimmedLine
                    .replace(/\\/g, '\\\\')
                    .replace(/"/g, '\\"');
            }
        }
      
        return purifiedText;
    }

    static generateFromJSXArray = (jsxElements: types.JSX[]) => {
        let stringJsx = '';
        for (const element of jsxElements) {
            const generated = generate(element);
            if (generated) stringJsx += `${generated}, `
        }
        return stringJsx.slice(0, -2);
    }
}