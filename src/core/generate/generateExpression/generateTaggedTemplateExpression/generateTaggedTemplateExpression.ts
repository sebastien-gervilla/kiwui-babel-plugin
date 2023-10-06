import { types } from "@babel/core";
import { generate } from "@/core";

export const generateTaggedTemplateExpression = (expression: types.TaggedTemplateExpression) => {
    const tag = generate(expression.tag);
    const quasi = generate(expression.quasi);
    return `${tag}${quasi}`
}