import { types } from "@babel/core";
import { generateJSXSpreadChild } from "./generateJSXSpreadChild";

const runFirstTest = () => it('should generate a JSXSpreadChild', () => {
    const expression = types.identifier("spreadObject");
    const jsxSpreadChild = types.jsxSpreadChild(expression);

    const result = generateJSXSpreadChild(jsxSpreadChild);

    expect(result).toBe('...spreadObject');
});

const runSecondTest = () => it('should generate a JSXSpreadChild with an array expression', () => {
    const expression = types.arrayExpression([
        types.numericLiteral(1),
        types.numericLiteral(2),
    ]);
    const jsxSpreadChild = types.jsxSpreadChild(expression);

    const result = generateJSXSpreadChild(jsxSpreadChild);

    expect(result).toBe('...[1, 2]');
});

const runThirdTest = () => it('should generate a JSXSpreadChild with a function call', () => {
    const expression = types.callExpression(
        types.identifier("getSpreadObject"),
        []
    );
    const jsxSpreadChild = types.jsxSpreadChild(expression);

    const result = generateJSXSpreadChild(jsxSpreadChild);

    expect(result).toBe('...getSpreadObject()');
});

describe('generateJSXSpreadChild', () => {
    runFirstTest();
    runSecondTest();
    runThirdTest();
});