// Types
import { types } from "@babel/core";
import { GeneratorMap } from "../generate.types";

// Generation functions
import { generate } from "@/core";
import { generateBlockStatement } from "./generateBlockStatement";
import { generateIfStatement } from "./generateIfStatement";
import { generateForStatement } from "./generateForStatement";
import { generateForOfStatement } from "./generateForOfStatement";
import { generateForInStatement } from "./generateForInStatement";
import { generateWhileStatement } from "./generateWhileStatement";
import { generateDoWhileStatement } from "./generateDoWhileStatement";
import { generateTryStatement } from "./generateTryStatement";
import { generateThrowStatement } from "./generateThrowStatement";
import { generateSwitchStatement } from "./generateSwitchStatement";
import { generateReturnStatement } from './generateReturnStatement';

export const statementGenerator: GeneratorMap<types.Statement> = {
    EmptyStatement: () => '', // It's ";"
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
    ThrowStatement: generateThrowStatement,
    SwitchStatement: generateSwitchStatement,

    // Keywords
    BreakStatement: () => "break",
    ContinueStatement: () => "continue",
    ReturnStatement: generateReturnStatement
}