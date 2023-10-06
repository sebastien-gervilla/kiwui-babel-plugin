import { types } from "@babel/core";
import { generate, generateFromArray } from "@/core";

export const generateSwitchStatement = (statement: types.SwitchStatement) => {
    const discriminant = generate(statement.discriminant);
    const cases = generateFromArray(statement.cases, '\n    ');

    return `switch (${discriminant}) {\n    ${cases}\n}`;
}