import { types } from "@babel/core";

const {
    isIdentifier,
    isCallExpression,
    isJSXEmptyExpression,
    isStringLiteral,
    isArrowFunctionExpression
} = types;

const generateExpression = (expression: types.Expression | types.JSXEmptyExpression): string => {
    if (isJSXEmptyExpression(expression)) {
      // Handle JSXEmptyExpression (e.g., <Component />)
      return '';
    }

    console.log('generate:', expression);

    // if (isArrowFunctionExpression(expression))
    //     return `${expression.expression}`

    if (isCallExpression(expression) && expression.callee.type == 'Identifier')
        return `${expression.callee.name}()`;

    if (isIdentifier(expression))
        return `${expression.name}`;

    if (isStringLiteral(expression))
        return `\"${expression.value}\"`
  
    // Handle other JSX expressions
    return ''
}

export default generateExpression;