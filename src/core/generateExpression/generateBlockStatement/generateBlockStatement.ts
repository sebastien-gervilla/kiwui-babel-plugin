import { generateStatement } from "../generateStatement";
import { types } from "@babel/core";

export const generateBlockStatement = (block: types.BlockStatement, wrapWithBraces: boolean = true): string => {
    const statements = block.body.map(stmt => generateStatement(stmt)).join('\n');
    return wrapWithBraces ? `{\n${statements}\n}` : statements;
}
