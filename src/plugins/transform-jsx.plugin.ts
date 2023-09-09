import { types, NodePath } from '@babel/core';
import { generate } from '@/core';
import injectImport from '../utils/injectKiwuiImport';

export default function transformJSX() {
    return {
        visitor: {
            Program: {
                enter(path: NodePath<types.Program>) {
                    let injected = false;

                    path.traverse({
                        JSXElement(path: NodePath<types.JSXElement>) {
                            // Inject Kiwui import
                            if (!injected) injected = injectImport(path);
                            
                            // Convert JSX element into a call to the custom pragma
                            const parentElement = generate(path.node);
                            path.replaceWithSourceString(parentElement);
                        },
                    });
                },
            },
        },
    };
};

export const JSX_PRAGMA = 'Kiwui.createElement';