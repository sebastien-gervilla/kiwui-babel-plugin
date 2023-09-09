// Types
import { types } from "@babel/core";
import { AliasMap } from "../generate.types";

// Generation functions
import { generateBlockStatement } from "./generateBlockStatement";
import { generateIfStatement } from "./generateIfStatement";
import { generateForStatement } from "./generateForStatement";
import { generateForOfStatement } from "./generateForOfStatement";
import { generateForInStatement } from "./generateForInStatement";
import { generateWhileStatement } from "./generateWhileStatement";
import { generateDoWhileStatement } from "./generateDoWhileStatement";
import { generateTryStatement } from "./generateTryStatement";
import { generateThrowStatement } from "./generateThrowStatement";
import { generate } from "@/core";

export const statementGenerator: AliasMap<types.Statement> = {
    ExpressionStatement: ({ expression }) => generate(expression),
    BlockStatement: generateBlockStatement,

    // Control Flow Structures
    IfStatement: generateIfStatement,
    ForStatement: generateForStatement,
    ForOfStatement: generateForOfStatement,
    ForInStatement: generateForInStatement,
    WhileStatement: generateWhileStatement,
    DoWhileStatement: generateDoWhileStatement,
    TryStatement: generateTryStatement,

    // Keywords
    BreakStatement: () => "break;",
    ContinueStatement: () => "continue;",
    ThrowStatement: generateThrowStatement,
    ReturnStatement: (expression) => { // TODO: Relocate
        const argument = expression.argument
            ? generate(expression.argument)
            : `${expression.argument}`

        return `return ${argument}`;
    }
}