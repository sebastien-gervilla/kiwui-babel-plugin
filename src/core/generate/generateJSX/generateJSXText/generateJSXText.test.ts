import { types } from "@babel/core";
import { generateJSXText } from "./generateJSXText";

const runFirstTest = () => it('should generate a JSXText', () => {
    const jsxText = types.jsxText('Hey');

    const result = generateJSXText(jsxText);

    expect(result).toBe('"Hey"');
});

const runSecondTest = () => it('should generate a JSXText with escaped characters', () => {
    const jsxText = types.jsxText('"');

    const result = generateJSXText(jsxText);

    expect(result).toBe('"\""');
});

const runThirdTest = () => it('should generate a JSXText with slashs and backslashes', () => {
    const jsxText = types.jsxText('\"');

    const result = generateJSXText(jsxText);

    expect(result).toBe('"\\\""');
});

describe('generateJSXSpreadChild', () => {
    // runFirstTest();
    // runSecondTest();
    runThirdTest();
});