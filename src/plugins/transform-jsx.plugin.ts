import { types, NodePath } from '@babel/core';
import { generate } from '@/core';
import injectImport from '../utils/injectKiwuiImport';

let injected = false;

const transformJSX = () => {
    return {
        visitor: {
            Program: {
                enter(path: NodePath<types.Program>) {
                    path.traverse({
                        JSXElement: handleJSX,
                        JSXFragment: handleJSX
                    });
                    
                    injected = false;
                },
            },
        },
    };
};

const handleJSX = (path: NodePath<types.JSXElement | types.JSXFragment>) => {
    // Inject Kiwui import
    if (!injected) injected = injectImport(path);

    // Convert JSX element into a call to the custom pragma
    const parentElement = generate(path.node);
    path.replaceWithSourceString(parentElement);
}
 
export const JSX_PRAGMA = 'Kiwui.createElement';

export default transformJSX;