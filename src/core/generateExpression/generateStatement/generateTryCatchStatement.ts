import { types } from "@babel/core";
import generateExpression from "../generateExpression";
import { generateStatement } from "./generateStatement";

export const generateTryStatement = (statement: types.TryStatement): string => {
    const tryBlock = generateStatement(statement.block);
    const catchBlock = statement.handler ? generateCatchClause(statement.handler) : '';
    const finallyBlock = statement.finalizer ? generateFinallyBlock(statement.finalizer) : '';

    return `try ${tryBlock} ${catchBlock} ${finallyBlock}`;
};

export const generateCatchClause = (clause: types.CatchClause): string => {
    const param = clause.param ? generateExpression(clause.param) : '';
    const catchBlock = generateStatement(clause.body);

    return `catch (${param}) ${catchBlock}`;
};

export const generateFinallyBlock = (block: types.BlockStatement): string => {
    return `finally ${generateStatement(block)}`;
};

