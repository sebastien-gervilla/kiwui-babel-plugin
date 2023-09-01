import { types } from "@babel/core";
import { generateJSXElement } from "../generateJSXElement";

describe("generateJSXElement", () => {
    it("should generate JSX element with attributes and children", () => {
        const element = types.jsxElement(
            types.jsxOpeningElement(
                types.jsxIdentifier("div"),
                [
                    types.jsxAttribute(types.jsxIdentifier("class"), types.stringLiteral("example")),
                    // Ajoutez d'autres attributs si nécessaire
                ],
                true
            ),
            types.jsxClosingElement(types.jsxIdentifier("div")),
            [
                types.jsxText("This is a JSX element."),
                // Ajoutez d'autres enfants si nécessaire
            ]
        );

        const result = generateJSXElement(element);

        expect(result).toBe(`Kiwui.createElement("div", { \"class\": \"example\" }, \"This is a JSX element.\")`);
    });

    it("should handle JSX identifiers with first character uppercase", () => {
        const element = types.jsxElement(
            types.jsxOpeningElement(
                types.jsxIdentifier("Component"),
                [],
                false
            ),
            types.jsxClosingElement(types.jsxIdentifier("Component")),
            []
        );

        const result = generateJSXElement(element);

        expect(result).toBe(`Kiwui.createElement(Component, null)`);
    });

    it("should handle unsupported JSX member expressions with attributes", () => {
        const element = types.jsxElement(
            types.jsxOpeningElement(
                types.jsxMemberExpression(
                    types.jsxIdentifier("Namespace"),
                    types.jsxIdentifier("Component")
                ),
                [
                    types.jsxAttribute(types.jsxIdentifier("prop1"), types.stringLiteral("value1")),
                    types.jsxAttribute(types.jsxIdentifier("prop2"), types.stringLiteral("value2")),
                ],
                false
            ),
            types.jsxClosingElement(types.jsxMemberExpression(
                types.jsxIdentifier("Namespace"),
                types.jsxIdentifier("Component")
            )),
            []
        );
    
        const result = generateJSXElement(element);
    
        expect(result).toBe(`Kiwui.createElement(Namespace.Component, { \"prop1\": \"value1\", \"prop2\": \"value2\" })`);
    });

    it("should handle JSX member expressions with recursion", () => {
        const element = types.jsxElement(
            types.jsxOpeningElement(
                types.jsxMemberExpression(
                    types.jsxMemberExpression(
                        types.jsxIdentifier("Menu"),
                        types.jsxIdentifier("Item")
                    ),
                    types.jsxIdentifier("Recursif")
                ),
                [],
                false
            ),
            types.jsxClosingElement(
                types.jsxMemberExpression(
                    types.jsxMemberExpression(
                        types.jsxIdentifier("Menu"),
                        types.jsxIdentifier("Item")
                    ),
                    types.jsxIdentifier("Recursif")
                )
            ),
            []
        );
    
        const result = generateJSXElement(element);
    
        expect(result).toBe(
            `Kiwui.createElement(Menu.Item.Recursif, null)`
        );
    });

    it("should handle unsupported JSX namespaces", () => {
        const element = types.jsxElement(
            types.jsxOpeningElement(
                types.jsxNamespacedName(
                    types.jsxIdentifier("namespace"),
                    types.jsxIdentifier("Component")
                ),
                [],
                false
            ),
            types.jsxClosingElement(types.jsxNamespacedName(
                types.jsxIdentifier("namespace"),
                types.jsxIdentifier("Component")
            )),
            []
        );

        expect(() => generateJSXElement(element)).toThrowError("Namespaces are currently not supported.");
    });


    it("should handle complex JSX attributes", () => {
        const onClickExpression = types.arrowFunctionExpression(
            [],
            types.blockStatement([
                types.expressionStatement(
                    types.callExpression(
                        types.memberExpression(
                            types.identifier("console"),
                            types.identifier("log")
                        ),
                        [
                            types.arrayExpression([types.spreadElement(types.identifier("array"))])
                        ]
                    )
                )
            ])
        );
    
        const element = types.jsxElement(
            types.jsxOpeningElement(
                types.jsxIdentifier("button"),
                [
                    types.jsxAttribute(
                        types.jsxIdentifier("onClick"),
                        types.jsxExpressionContainer(onClickExpression)
                    )
                ],
                false
            ),
            types.jsxClosingElement(types.jsxIdentifier("button")),
            [types.jsxText("Button")]
        );
    
        const result = generateJSXElement(element);
    
        expect(result).toBe(
            'Kiwui.createElement("button", { "onClick": () => console.log([...array]); }, "Button")'
        );
    });


    it("should handle JSX with an arrow function onClick handler", () => {
        const arrowFunction = types.arrowFunctionExpression(
            [],
            types.blockStatement([
                types.variableDeclaration("const", [
                    types.variableDeclarator(
                        types.objectPattern([
                            types.objectProperty(
                                types.identifier("name"),
                                types.assignmentPattern(
                                    types.identifier("name"),
                                    types.stringLiteral("default")
                                )
                            )
                        ]),
                        types.identifier("object")
                    )
                ]),
                types.expressionStatement(
                    types.callExpression(
                        types.memberExpression(
                            types.identifier("console"),
                            types.identifier("log")
                        ),
                        [types.identifier("name")]
                    )
                )
            ])
        );

        const element = types.jsxElement(
            types.jsxOpeningElement(
                types.jsxIdentifier("button"),
                [
                    types.jsxAttribute(
                        types.jsxIdentifier("onClick"),
                        types.jsxExpressionContainer(arrowFunction)
                    )
                ],
                false
            ),
            types.jsxClosingElement(types.jsxIdentifier("button")),
            [types.jsxText("Button")]
        );

        const result = generateJSXElement(element);

        expect(result).toBe(
            'Kiwui.createElement("button", { "onClick": () => {\nconst { name = "default" } = object;\nconsole.log(name);\n} }, "Button")'
        );
    });
});
