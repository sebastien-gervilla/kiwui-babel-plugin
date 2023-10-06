import { types } from "@babel/core";
import { generateOptionalCallExpression } from "./generateOptionalCallExpression";

const runFirstTest = () => it('should generate an OptionalCallExpression with computed property, no arguments, and optional chaining', () => {
    const callee = types.optionalMemberExpression(
        types.identifier("obj"),
        types.identifier("method"),
        true, // Set computed to true
        true // Set optional to true
    );
    const optionalCallExpression = types.optionalCallExpression(callee, [], true);

    const result = generateOptionalCallExpression(optionalCallExpression);

    expect(result).toBe('obj?.[method]?.()');
});

const runSecondTest = () => it('should generate an OptionalCallExpression with computed property, arguments, and no optional chaining', () => {
    const callee = types.optionalMemberExpression(
        types.identifier("obj"),
        types.identifier("method"),
        true, // Set computed to true
        true // Set optional to true
    );
    const args = [types.identifier("arg1"), types.identifier("arg2")];
    const optionalCallExpression = types.optionalCallExpression(callee, args, false);

    const result = generateOptionalCallExpression(optionalCallExpression);

    expect(result).toBe('obj?.[method]?.(arg1, arg2)');
});

const runThirdTest = () => it('should generate an OptionalCallExpression with computed property, arguments, and optional chaining', () => {
    const callee = types.optionalMemberExpression(
        types.identifier("obj"),
        types.identifier("method"),
        true, // Set computed to true
        true // Set optional to true
    );
    const args = [types.identifier("arg1"), types.identifier("arg2")];
    const optionalCallExpression = types.optionalCallExpression(callee, args, true);

    const result = generateOptionalCallExpression(optionalCallExpression);

    expect(result).toBe('obj?.[method]?.(arg1, arg2)');
});

describe('generateOptionalCallExpression', () => {
    runFirstTest();
    runSecondTest();
    runThirdTest();
});