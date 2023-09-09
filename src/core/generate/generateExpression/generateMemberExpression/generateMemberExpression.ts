import { types } from "@babel/core";
import { generate } from "@/core";

export const generateMemberExpression = (expression: types.MemberExpression): string => {
    const object = generate(expression.object);
    const property = generate(expression.property);

    return expression.computed
        ? `${object}[${property}]`
        : `${object}.${property}`
}