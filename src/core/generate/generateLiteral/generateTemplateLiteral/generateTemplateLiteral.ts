import { types } from "@babel/core";
import { generate } from "@/core";

export const generateTemplateLiteral = (literal: types.TemplateLiteral) => {
    const { quasis, expressions } = literal;

    let template = '`';
    for (let i = 0; i < quasis.length; i++) {
        template += generate(quasis[i]);
        if (expressions[i])
            template += '$' + `{${generate(expressions[i])}}`;
    }
    
    return template + '`';
}