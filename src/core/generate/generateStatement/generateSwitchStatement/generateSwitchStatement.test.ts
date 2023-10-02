import { types } from "@babel/core";
import { generateSwitchStatement } from "./generateSwitchStatement";

const runFirstTest = () => it("should generate a simple switch statement", () => {
    const switchStatement = types.switchStatement(
        types.identifier("variableToSwitchOn"),
        [
            types.switchCase(
                types.numericLiteral(1), [
                    types.expressionStatement(types.stringLiteral("Case 1")),
                    types.breakStatement()
                ]
            ),
            types.switchCase(
                types.numericLiteral(2), [
                    types.expressionStatement(types.stringLiteral("Case 2")),
                    types.breakStatement()
                ]
            ),
        ]
    );

    const result = generateSwitchStatement(switchStatement);

    expect(result).toBe(
`switch (variableToSwitchOn) {
    case 1:
        "Case 1";
        break;
    case 2:
        "Case 2";
        break;
}`);
});

const runSecondTest = () => it("should generate a switch statement with a default case", () => {
    const switchStatement = types.switchStatement(
        types.identifier("variableToSwitchOn"),
        [
            types.switchCase(
                types.numericLiteral(1), [
                    types.expressionStatement(types.stringLiteral("Case 1")),
                    types.breakStatement()
                ]
            ),
            types.switchCase(null, [types.expressionStatement(types.stringLiteral("Default Case"))]),
        ]
    );

    const result = generateSwitchStatement(switchStatement);

    expect(result).toBe(
`switch (variableToSwitchOn) {
    case 1:
        "Case 1";
        break;
    default:
        "Default Case";
}`);
});

const runThirdTest = () => it("should generate a switch statement with an expression to switch on", () => {
    const switchStatement = types.switchStatement(
        types.binaryExpression("*", types.identifier("a"), types.identifier("b")),
        [
            types.switchCase(
                types.numericLiteral(0), [
                    types.expressionStatement(types.stringLiteral("Case 0")),
                    types.breakStatement()
                ]
            ),
            types.switchCase(
                types.numericLiteral(1), [
                    types.expressionStatement(types.stringLiteral("Case 1")),
                    types.breakStatement()
                ]
            ),
        ]
    );

    const result = generateSwitchStatement(switchStatement);

    expect(result).toBe(
`switch (a * b) {
    case 0:
        "Case 0";
        break;
    case 1:
        "Case 1";
        break;
}`);
});

describe("generateSwitchStatement", () => {
    runFirstTest();
    runSecondTest();
    runThirdTest();
});