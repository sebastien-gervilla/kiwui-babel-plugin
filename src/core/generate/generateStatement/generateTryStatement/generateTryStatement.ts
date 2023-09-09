import { types } from "@babel/core";
import { generate } from "@/core";

export const generateTryStatement = (statement: types.TryStatement): string => {
    const tryBlock = generate(statement.block);
    const catchBlock = statement.handler ? generateCatchClause(statement.handler) : '';
    const finallyBlock = statement.finalizer ? generateFinallyBlock(statement.finalizer) : '';

    return `try ${tryBlock} ${catchBlock} ${finallyBlock}`;
};

export const generateCatchClause = (clause: types.CatchClause): string => {
    const param = clause.param ? generate(clause.param) : '';
    const catchBlock = generate(clause.body);

    return `catch (${param}) ${catchBlock}`;
};

export const generateFinallyBlock = (block: types.BlockStatement): string => {
    return `finally ${generate(block)}`;
};

