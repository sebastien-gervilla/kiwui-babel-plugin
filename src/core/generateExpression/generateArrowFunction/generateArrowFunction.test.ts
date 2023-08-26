import { types } from "@babel/core";
import { generateArrowFunction } from "../generateArrowFunction";

describe("generateArrowFunction", () => {
  it("should generate an arrow function with parameters and body", () => {
    const param1 = types.identifier("param1");
    const param2 = types.identifier("param2");
    const body = types.blockStatement([types.returnStatement(types.numericLiteral(42))]);
    
    const arrowFunction = types.arrowFunctionExpression([param1, param2], body);
    
    const result = generateArrowFunction(arrowFunction);
    
    expect(result).toBe("(param1, param2) => {\nreturn 42;\n}");
  });

  it("should generate an arrow function with no parameters and expression body", () => {
    const body = types.numericLiteral(42);
    
    const arrowFunction = types.arrowFunctionExpression([], body);
    
    const result = generateArrowFunction(arrowFunction);
    
    expect(result).toBe("() => 42");
  });

});
