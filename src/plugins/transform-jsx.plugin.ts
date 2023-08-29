import { types, NodePath } from '@babel/core';
import { generateJSXElement } from '../core';

const {
    identifier,
    stringLiteral,
    importDeclaration,
    importNamespaceSpecifier
} = types;

export const jsxPragma = 'Kiwui.createElement';

export default function transformJSX() {
    return {
        visitor: {
            Program: {
                enter(path: NodePath<types.Program>) {
                    let injected = false;

                    path.traverse({
                        JSXElement(path: NodePath<types.JSXElement>) {
                            if (!injected) {
                                // Inject import statement for the custom pragma
                                const importStatement = importDeclaration(
                                    [importNamespaceSpecifier(identifier("Kiwui"))],
                                    stringLiteral('kiwui')
                                );

                                // Add the import statement to the top-level scope
                                const programPath = path.findParent((p) => p.isProgram()) as NodePath<types.Program>;
                                if (programPath) {
                                    const clonedImportStatement = types.cloneNode(importStatement);
                                    (programPath.node.body as types.Statement[]).unshift(clonedImportStatement);
                                    injected = true;
                                }
                            }
                            
                            // Convert JSX element into a call to the custom pragma
                            const parentElement = generateJSXElement(path.node);
                            path.replaceWithSourceString(parentElement);
                        },
                    });
                },
            },
        },
    };
};