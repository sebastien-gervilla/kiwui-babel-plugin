import { types } from "@babel/core";
import { generateTemplateLiteral } from "./generateTemplateLiteral";

const runFirstTest = () => it("should generate a simple template literal", () => {
    const templateLiteral = types.templateLiteral(
        [types.templateElement({ raw: "Hello, ", cooked: "Hello, " }, true)],
        []
    );

    const result = generateTemplateLiteral(templateLiteral);

    expect(result).toBe('`Hello, `');
});

const runSecondTest = () => it("should generate a template literal with expressions", () => {
    const templateLiteral = types.templateLiteral(
        [
            types.templateElement({ raw: "Hello, ", cooked: "Hello, " }, false),
            types.templateElement({ raw: "!", cooked: "!" }, true)
        ],
        [types.identifier("name")]
    );

    const result = generateTemplateLiteral(templateLiteral);

    expect(result).toBe('`Hello, ${name}!`');
});

const runThirdTest = () => it("should generate a template literal with expressions and escape characters", () => {
    const templateLiteral = types.templateLiteral(
        [
            types.templateElement({ raw: "Line 1\\nLine 2\\tTabbed", cooked: "Line 1\nLine 2\tTabbed" }, true)
        ],
        []
    );

    const result = generateTemplateLiteral(templateLiteral);

    expect(result).toBe('`Line 1\\nLine 2\\tTabbed`');
});

const runFourthTest = () => it("should generate a template literal with empty expressions", () => {
    const templateLiteral = types.templateLiteral(
        [
            types.templateElement({ raw: "Empty: ", cooked: "Empty: " }, false),
            types.templateElement({ raw: "", cooked: "" }, true)
        ],
        [types.identifier("value")]
    );

    const result = generateTemplateLiteral(templateLiteral);

    expect(result).toBe('`Empty: ${value}`');
});

describe("generateTemplateLiteral", () => {
    runFirstTest();
    runSecondTest();
    runThirdTest();
    runFourthTest();
});