import { types } from '@babel/core';
import { generate } from '@/core';

export const generateReturnStatement = (statement: types.ReturnStatement) => {
    const argument = statement.argument
        ? generate(statement.argument)
        : `${statement.argument}`

    return `return ${argument}`;
}