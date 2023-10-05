import { types } from "@babel/core";
import { generate, generateFromArray } from "@/core";

// TODO: https://stackoverflow.com/questions/42480949/what-do-the-curly-braces-do-in-switch-statement-after-case-in-es6
export const generateSwitchCase = (switchCase: types.SwitchCase) => {
    const test = switchCase.test
        ? `case ${generate(switchCase.test)}`
        : 'default';

    const consequent = generateFromArray(
        switchCase.consequent, 
        ';\n        '
    );
    
    return `${test}:\n        ${consequent};`;
}