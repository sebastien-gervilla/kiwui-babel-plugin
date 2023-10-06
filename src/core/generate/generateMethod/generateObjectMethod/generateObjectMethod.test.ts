import { types } from "@babel/core";
import { generateObjectMethod } from "./generateObjectMethod";

describe('generateObjectMethod', () => { // TODO: generator and computed
    it('should generate object method without kind', () => {
        const method = types.objectMethod(
            undefined,
            types.identifier('myMethod'), [
                types.identifier("param")
            ],
            types.blockStatement([
                types.expressionStatement(
                    types.assignmentExpression(
                        '=',
                        types.identifier('my'),
                        types.numericLiteral(42)
                    )
                )
            ])
        );
        
        const result = generateObjectMethod(method);
        expect(result).toBe('myMethod(param) {\nmy = 42;\n}');
    });

    it('should generate object method with "method" kind', () => {
        const method = types.objectMethod(
            "method",
            types.identifier('anotherMethod'), [
                types.identifier("param1"),
                types.identifier("param2")
            ],
            types.blockStatement([
                types.expressionStatement(
                    types.assignmentExpression(
                        '=',
                        types.identifier('myVar'),
                        types.stringLiteral('Hello')
                    )
                )
            ])
        );

        const result = generateObjectMethod(method);
        expect(result).toBe('anotherMethod(param1, param2) {\nmyVar = "Hello";\n}');
    });

    it('should generate object method with "get" kind', () => {
        const method = types.objectMethod(
            "get",
            types.identifier('getterMethod'), [],
            types.blockStatement([
                types.returnStatement(
                    types.identifier('myProperty')
                )
            ])
        );

        const result = generateObjectMethod(method);
        expect(result).toBe('get getterMethod() {\nreturn myProperty;\n}');
    });

    it('should generate object method with "set" kind', () => {
        const method = types.objectMethod(
            "set",
            types.identifier('setterMethod'), [
                types.identifier('newValue')
            ],
            types.blockStatement([
                types.expressionStatement(
                    types.assignmentExpression(
                        '=',
                        types.identifier('myProperty'),
                        types.identifier('newValue')
                    )
                )
            ])
        );

        const result = generateObjectMethod(method);
        expect(result).toBe('set setterMethod(newValue) {\nmyProperty = newValue;\n}');
    });
});