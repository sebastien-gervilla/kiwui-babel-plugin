import { types } from "@babel/core";
import { generateMemberExpression } from "../generateMemberExpression";

describe("generateMemberExpression", () => {
    it("should generate a member expression with identifier property", () => {
        const object = types.identifier("myObject");
        const property = types.identifier("myProperty");
        const expression = types.memberExpression(object, property);

        const result = generateMemberExpression(expression);

        expect(result).toBe("myObject.myProperty");
    });

    it("should generate a member expression with string literal property", () => {
        const object = types.identifier("myObject");
        const property = types.identifier("myProperty"); // Utiliser types.identifier pour créer un nœud de syntaxe d'identifiant
        const expression = types.memberExpression(object, property);

        const result = generateMemberExpression(expression);

        expect(result).toBe('myObject.myProperty'); // Utiliser la notation du point pour les identifiants
    });



    it("should ignore PrivateName property", () => {
        const object = types.identifier("myObject");
        const property = types.privateName(types.identifier("privateProperty"));
        const expression = types.memberExpression(object, property);

        const result = generateMemberExpression(expression);

        expect(result).toBe("myObject");
    });
});