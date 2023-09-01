import { types } from "@babel/core";
import { generateChildren } from "..";

const generateJSXMemberExpression = (expression: types.JSXMemberExpression | types.JSXIdentifier): string => {
    if (types.isJSXIdentifier(expression)) {
        return expression.name;
    } else {
        const object = generateJSXMemberExpression(expression.object);
        const property = types.isJSXIdentifier(expression.property)
            ? expression.property.name
            : `"${(expression.property as types.StringLiteral).value}"`;

        return `${object}.${property}`;
    }
}

export default generateJSXMemberExpression;