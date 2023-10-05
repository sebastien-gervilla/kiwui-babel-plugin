import { types } from "@babel/core";
import { generateClassDeclaration } from "./generateClassDeclaration";

const runFirstTest = () => it("should generate a simple ClassDeclaration", () => {
    const className = types.identifier("MyClass");
    const classBody = types.classBody([
        types.classMethod(
            "constructor",
            types.identifier("constructor"),
            [types.identifier("param1"), types.identifier("param2")],
            types.blockStatement([
                types.expressionStatement(types.identifier("super(param1, param2)")),
            ])
        ),
        types.classMethod(
            "method",
            types.identifier("myMethod"),
            [],
            types.blockStatement([
                types.expressionStatement(types.stringLiteral("Hello, World!")),
            ])
        ),
    ]);

    const classDeclaration = types.classDeclaration(className, null, classBody);

    const result = generateClassDeclaration(classDeclaration);

    expect(result).toBe("class MyClass {\nconstructor(param1, param2) {\nsuper(param1, param2);\n}\nmyMethod() {\n\"Hello, World!\";\n}\n}");
});

const runSecondTest = () => it("should generate a ClassDeclaration with extends", () => {
    const className = types.identifier("MyClass");
    const superClass = types.identifier("BaseClass");
    const classBody = types.classBody([]);

    const classDeclaration = types.classDeclaration(className, superClass, classBody);

    const result = generateClassDeclaration(classDeclaration);

    expect(result).toBe("class MyClass extends BaseClass {\n\n}");
});

describe("generateClassDeclaration", () => {
    runFirstTest();
    runSecondTest();
});