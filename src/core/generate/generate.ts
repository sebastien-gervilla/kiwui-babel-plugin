// Utils
import { handleUnsuported } from "../../utils/handleUnsuported";

// Transformation
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
import { AliasMap, PossibleAliases, isGenerationFunction } from "./generate.types";

const generator: AliasMap<PossibleAliases> = {
    ...expressionGenerator,
    ...statementGenerator,
    ...declarationGenerator,
    ...literalGenerator,
    ...methodGenerator,
    ...propertyGenerator,
    ...patternGenerator,
    ...privateGenerator,
    ...jsxGenerator,
    SpreadElement: (expression) => `...${generate(expression.argument)}`, // TODO: Relocate This
    VariableDeclarator: (expression) => { // TODO: Relocate This
        const left = generate(expression.id)
        if (!expression.init)
            return `${left}`;

        const init = generate(expression.init);
        return `${left} = ${init}`;
    },
    TemplateElement: (expression) => expression.value.raw
}

export const generate = (value: PossibleAliases) => {
    const generationFunction = generator[value.type];
    if (isGenerationFunction(generationFunction))
        return generationFunction(value);

    return handleUnsuported(
        value,
        `Unsupported ${value.type}.`
    );
}

export const generateFromArray = (values: PossibleAliases[], separator: string = ', ') => {
    let stringValue = '';
    for (const value of values)
        stringValue += generate(value) + separator;
    return stringValue.slice(0, -separator.length);
}