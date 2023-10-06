import { types } from "@babel/core";
import { generateClassMethod } from "./generateClassMethod";

describe('generateClassMethod', () => { // TODO: generator and computed
    it('should generate a basic class method', () => {
        const method = types.classMethod(
            "method",
            types.identifier("myMethod"),
            [],
            types.blockStatement([
                types.returnStatement(
                    types.stringLiteral("Hello, world!")
                )
            ])
        );

        const result = generateClassMethod(method);
        expect(result).toBe('myMethod() {\nreturn "Hello, world!";\n}');
    });

    it('should generate a class method with parameters', () => {
        const method = types.classMethod(
            "method",
            types.identifier("add"),
            [
                types.identifier("a"),
                types.identifier("b")
            ],
            types.blockStatement([
                types.returnStatement(
                    types.binaryExpression(
                        '+',
                        types.identifier("a"),
                        types.identifier("b")
                    )
                )
            ])
        );

        const result = generateClassMethod(method);
        expect(result).toBe('add(a, b) {\nreturn a + b;\n}');
    });

    it('should generate a static class method', () => {
        const method = types.classMethod(
            "method",
            types.identifier("staticMethod"),
            [],
            types.blockStatement([
                types.returnStatement(
                    types.stringLiteral("Static method")
                )
            ]),
            undefined, // Computed
            true // Static
        );

        const result = generateClassMethod(method);
        expect(result).toBe('static staticMethod() {\nreturn "Static method";\n}');
    });

    it('should generate an async class method', () => {
        const method = types.classMethod(
            "method",
            types.identifier("asyncMethod"),
            [],
            types.blockStatement([
                types.returnStatement(
                    types.awaitExpression(
                        types.callExpression(
                            types.identifier("fetchData"),
                            []
                        )
                    )
                )
            ]),
            undefined,
            false, // Not static
            undefined,
            true // async
        );

        const result = generateClassMethod(method);
        expect(result).toBe('async asyncMethod() {\nreturn await fetchData();\n}');
    });

    it('should generate an async class method', () => {
        const key = types.privateName(types.identifier("myPrivateMethod"));
        const method = types.classPrivateMethod(
            "method",
            key,
            [],
            types.blockStatement([
                types.expressionStatement(types.stringLiteral("Hello, World!")),
            ])
        );

        const result = generateClassMethod(method);

        expect(result).toBe("#myPrivateMethod() {\n\"Hello, World!\";\n}");
    });
});