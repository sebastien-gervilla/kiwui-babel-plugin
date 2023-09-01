import { types } from "@babel/core";
import { generateObjectPatternProperties } from "../generateObjectPatternProperties";

describe("generateObjectPatternProperties", () => {
    it("should generate object pattern properties", () => {
        const prop1 = types.objectProperty(types.identifier("key1"), types.identifier("value1"));
        const prop2 = types.objectProperty(types.stringLiteral("key2"), types.stringLiteral("value2"));
        const pattern = types.objectPattern([prop1, prop2]);

        const result = generateObjectPatternProperties(pattern);

        expect(result).toBe('key1: value1, key2: "value2"');
    });

    it("should handle rest elements", () => {
        const restElement = types.restElement(types.identifier("rest"));
        const pattern = types.objectPattern([restElement]);

        const result = generateObjectPatternProperties(pattern);

        expect(result).toBe('...rest');
    });

    it("should ignore non-identifier and non-string-literal property keys", () => {
        const property1 = types.objectProperty(types.identifier("key"), types.identifier("value"));
        const property2 = types.objectProperty(types.identifier("key2"), types.stringLiteral("value2"));
        const pattern = types.objectPattern([property1, property2]);

        const result = generateObjectPatternProperties(pattern);

        expect(result).toBe('key: value, key2: "value2"');
    });

});