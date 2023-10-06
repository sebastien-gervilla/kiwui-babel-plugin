import { types } from "@babel/core";
import { generate } from "@/core";

export const generateOptionalMemberExpression = (expression: types.OptionalMemberExpression) => {
    const object = generate(expression.object);
    const property = generate(expression.property);

    return expression.computed
        ? `${object}?.[${property}]`
        : `${object}?.${property}`;
}