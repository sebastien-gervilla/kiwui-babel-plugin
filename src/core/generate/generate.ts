// Utils
import { handleUnsuported } from "../../utils/handleUnsuported";

// Transformation
import { standardizedGenerator } from "./generateStandardized";
import { expressionGenerator } from "./generateExpression";
import { statementGenerator } from "./generateStatement";
import { declarationGenerator } from "./generateDeclaration";
import { literalGenerator } from "./generateLiteral";
import { methodGenerator } from "./generateMethod";
import { propertyGenerator } from "./generateProperty";
import { patternGenerator } from "./generatePattern";
import { privateGenerator } from "./generatePrivate";
import { jsxGenerator } from "./generateJSX";

// Types
import { GeneratorMap, isGenerationFunction } from "./generate.types";
import { Node } from "@babel/core";

const generator: GeneratorMap<Node> = {
    ...standardizedGenerator,
    ...expressionGenerator,
    ...statementGenerator,
    ...declarationGenerator,
    ...literalGenerator,
    ...methodGenerator,
    ...propertyGenerator,
    ...patternGenerator,
    ...privateGenerator,
    ...jsxGenerator,
    VariableDeclarator: (expression) => { // TODO: Relocate This
        const left = generate(expression.id)
        if (!expression.init)
            return `${left}`;

        const init = generate(expression.init);
        return `${left} = ${init}`;
    },
    // TODO: Curly braces with switch ?
    // https://stackoverflow.com/questions/42480949/what-do-the-curly-braces-do-in-switch-statement-after-case-in-es6
    SwitchCase: (switchCase) => {
        const test = switchCase.test
            ? `case ${generate(switchCase.test)}`
            : 'default';
    
        const consequent = generateFromArray(
            switchCase.consequent, 
            ';\n        '
        );
        
        return `${test}:\n        ${consequent};`;
    }
}

export const generate = (value: Node) => {
    const generationFunction = generator[value.type];
    if (isGenerationFunction(generationFunction))
        return generationFunction(value);

    return handleUnsuported(
        value,
        `Unsupported ${value.type}.`
    );
}

export const generateFromArray = (values: Node[], separator: string = ', ') => {
    let stringValue = '';
    for (const value of values)
        stringValue += generate(value) + separator;
    return stringValue.slice(0, -separator.length);
}