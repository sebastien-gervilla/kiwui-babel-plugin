import { types } from "@babel/core";
import { generateAssignementExpression } from "../generateAssignementExpression";

describe("generateAssignementExpression", () => {
  
    it("should generate an assignment expression with expression on the left", () => {
    const left = types.identifier("variable");
    const right = types.numericLiteral(42);
    
    const assignmentExpression = types.assignmentExpression("=", left, right);
    
    const result = generateAssignementExpression(assignmentExpression);
    
    expect(result).toBe("variable = 42");
  });

});