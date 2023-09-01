import { types } from "@babel/core";
import generateExpression from "../generateExpression";

export const generateArrayExpression = (expression: types.ArrayExpression) => {
    const elements = expression.elements.map((element) => {
        if (element === null) {
            return 'null';
        } else if (types.isSpreadElement(element)) {
            return `...${generateExpression(element.argument)}`;
        } else {
            return generateExpression(element);
        }
    }).join(', ');

    return `[${elements}]`;
};