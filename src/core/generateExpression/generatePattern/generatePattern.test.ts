import { types } from "@babel/core";
import { generatePattern } from "../generatePattern";

describe("generatePattern", () => {
    it("generates identifier correctly", () => {
      const identifier = types.identifier("param");
  
      const result = generatePattern(identifier);
  
      expect(result).toBe("param");
    });

    it("generates object pattern correctly", () => {
        const objProp1 = types.objectProperty(types.identifier("x"), types.identifier("x"));
        const objProp2 = types.objectProperty(types.identifier("y"), types.identifier("y"));
        const objectPattern = types.objectPattern([objProp1, objProp2]);

        const result = generatePattern(objectPattern);

        const expected = `{ ${"x"}: ${generatePattern(objProp1.value as types.Pattern)}, ${"y"}: ${generatePattern(objProp2.value as types.Pattern)} }`;
        expect(result).toBe(expected);
    });
  
    it("generates array pattern correctly", () => {
      const arrayElem1 = types.identifier("x");
      const arrayElem2 = types.identifier("y");
      const arrayPattern = types.arrayPattern([arrayElem1, arrayElem2]);
  
      const result = generatePattern(arrayPattern);
  
      const expected = `[ ${arrayElem1.name}, ${arrayElem2.name} ]`;
      expect(result).toBe(expected);
    });
  
    it("returns empty string for unsupported pattern", () => {
      const unsupportedPattern = types.restElement(types.identifier("param"));
  
      const result = generatePattern(unsupportedPattern);
  
      expect(result).toBe("");
    });
  });