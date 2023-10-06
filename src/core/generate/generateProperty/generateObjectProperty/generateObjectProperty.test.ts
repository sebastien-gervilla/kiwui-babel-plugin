import { types } from "@babel/core";
import { generateObjectProperty } from "./generateObjectProperty";

const runFirstTest = () => it("should generate a simple object property", () => {
    const objectProperty = types.objectProperty(
        types.identifier("key"),
        types.stringLiteral("value")
    );

    const result = generateObjectProperty(objectProperty);

    expect(result).toBe("key: \"value\"");
});

const runSecondTest = () => it("should generate a computed object property", () => {
    const objectProperty = types.objectProperty(
        types.stringLiteral("computedKey"),
        types.booleanLiteral(true),
        true
    );

    const result = generateObjectProperty(objectProperty);

    expect(result).toBe("[\"computedKey\"]: true");
});

const runThirdTest = () => it("should generate an object property with a shorthand identifier", () => {
    const objectProperty = types.objectProperty(
        types.identifier("key"),
        types.identifier("key")
    );

    const result = generateObjectProperty(objectProperty);

    expect(result).toBe("key: key");
});

const runFourthTest = () => it("should generate an object property with a computed shorthand identifier", () => {
    const objectProperty = types.objectProperty(
        types.identifier("computedKey"),
        types.identifier("computedKey"),
        true
    );

    const result = generateObjectProperty(objectProperty);

    expect(result).toBe("[computedKey]: computedKey");
});

describe("generateObjectProperty", () => {
    runFirstTest();
    runSecondTest();
    runThirdTest();
    runFourthTest();
});