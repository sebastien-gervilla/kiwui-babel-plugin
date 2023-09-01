import { types } from "@babel/core";
import { generateVariableDeclaration } from "../generateVariableDeclaration";

describe("generateVariableDeclaration", () => {
  it("generates variable declaration for object pattern", () => {
    const objectPattern = types.objectPattern([
      types.objectProperty(types.identifier("x"), types.identifier("x")),
      types.objectProperty(types.identifier("y"), types.identifier("y")),
    ]);
    const variableDeclarator = types.variableDeclarator(objectPattern, types.identifier("obj"));
    const variableDeclaration = types.variableDeclaration("let", [variableDeclarator]);

    const result = generateVariableDeclaration(variableDeclaration);

    const expected = "let { x: x, y: y } = obj";
    expect(result).toBe(expected);
  });

  it("generates variable declaration for array pattern", () => {
    const arrayPattern = types.arrayPattern([
      types.identifier("x"),
      types.identifier("y"),
    ]);
    const variableDeclarator = types.variableDeclarator(arrayPattern, types.identifier("arr"));
    const variableDeclaration = types.variableDeclaration("const", [variableDeclarator]);

    const result = generateVariableDeclaration(variableDeclaration);

    const expected = "const [x, y] = arr";
    expect(result).toBe(expected);
  });

  it("generates variable declaration for identifier", () => {
    const identifier = types.identifier("x");
    const variableDeclarator = types.variableDeclarator(identifier);
    const variableDeclaration = types.variableDeclaration("var", [variableDeclarator]);

    const result = generateVariableDeclaration(variableDeclaration);

    const expected = "var x";
    expect(result).toBe(expected);
  });

  it("generates variable declaration with init expression", () => {
    const identifier = types.identifier("x");
    const initExpression = types.numericLiteral(42);
    const variableDeclarator = types.variableDeclarator(identifier, initExpression);
    const variableDeclaration = types.variableDeclaration("var", [variableDeclarator]);

    const result = generateVariableDeclaration(variableDeclaration);

    const expected = "var x = 42";
    expect(result).toBe(expected);
  });

  it("generates empty string for unsupported declaration", () => {
    const unsupportedDeclaration = types.variableDeclaration("const", []);

    const result = generateVariableDeclaration(unsupportedDeclaration);

    expect(result).toBe("");
  });
});
