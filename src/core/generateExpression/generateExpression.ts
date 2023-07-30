import { types } from "@babel/core";

const {
    isIdentifier,
    isCallExpression,
    isJSXEmptyExpression
} = types;

const generateExpression = (expression: types.Expression | types.JSXEmptyExpression): string => {
    if (isJSXEmptyExpression(expression)) {
      // Handle JSXEmptyExpression (e.g., <Component />)
      return '';
    }

    console.log('generate:', expression);

    if (isCallExpression(expression) && expression.callee.type == 'Identifier')
        return `${expression.callee.name}()`;

    if (isIdentifier(expression))
        return `\"${expression.name}\"`;
  
    // Handle other JSX expressions
    return ''
}

export default generateExpression;