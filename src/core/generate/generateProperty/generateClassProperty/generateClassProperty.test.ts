import { types } from "@babel/core";
import { generateClassProperty } from "./generateClassProperty";

const runFirstTest = () => it("should generate a simple ClassProperty without type annotation", () => {
    const propertyName = types.identifier("myProperty");
    const propertyValue = types.stringLiteral("MyValue");
    const classProperty = types.classProperty(propertyName, propertyValue);

    const result = generateClassProperty(classProperty);

    expect(result).toBe("myProperty = \"MyValue\";");
});

describe("generateClassProperty", () => {
    runFirstTest();
});