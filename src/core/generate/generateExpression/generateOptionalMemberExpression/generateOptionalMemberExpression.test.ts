import { types } from "@babel/core";
import { generateOptionalMemberExpression } from "./generateOptionalMemberExpression";

const runFirstTest = () => it('should generate an OptionalMemberExpression with optional chaining', () => {
    const object = types.identifier("obj");
    const property = types.identifier("prop");
    const optionalMemberExpression = types.optionalMemberExpression(object, property, false, false);

    const result = generateOptionalMemberExpression(optionalMemberExpression);

    expect(result).toBe('obj?.prop');
});

const runSecondTest = () => it('should generate an OptionalMemberExpression with computed property and optional chaining', () => {
    const object = types.identifier("obj");
    const property = types.identifier("prop");
    const optionalMemberExpression = types.optionalMemberExpression(object, property, true, true);

    const result = generateOptionalMemberExpression(optionalMemberExpression);

    expect(result).toBe('obj?.[prop]');
});

describe('generateOptionalMemberExpression', () => {
    runFirstTest();
    runSecondTest();
});