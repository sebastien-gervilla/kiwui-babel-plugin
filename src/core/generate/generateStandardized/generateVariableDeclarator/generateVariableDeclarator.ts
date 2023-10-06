import { types } from "@babel/core";
import { generate } from "@/core";

export const generateVariableDeclarator = (declarator: types.VariableDeclarator) => {
    const left = generate(declarator.id)
    if (!declarator.init)
        return `${left}`;

    const init = generate(declarator.init);
    return `${left} = ${init}`;
}