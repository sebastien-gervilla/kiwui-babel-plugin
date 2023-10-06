import { types } from "@babel/core";
import { generateRegExpLiteral } from "./generateRegExpLiteral";

describe('generateRegExpLiteral', () => {
    it('should generate a valid regex literal without flags', () => {
        const regex = types.regExpLiteral("/[^a-z]+/");
        const generated = generateRegExpLiteral(regex);
        expect(generated).toBe('/[^a-z]+/');
    });

    it('should generate a valid regex literal with flags', () => {
        const regex = types.regExpLiteral("/[^a-z]+/", "g");
        const generated = generateRegExpLiteral(regex);
        expect(generated).toBe('/[^a-z]+/g');
    });
});