import { types, NodePath } from '@babel/core';

const {
    cloneNode,
    identifier,
    stringLiteral,
    importDeclaration,
    importNamespaceSpecifier
} = types;

const injectKiwuiImport = (path: NodePath<types.JSXElement>) => {
    // Inject import statement for the custom pragma
    const importStatement = importDeclaration(
        [importNamespaceSpecifier(identifier("Kiwui"))],
        stringLiteral('kiwui')
    );

    // Add the import statement to the top-level scope
    const programPath = path.findParent(
        parent => parent.isProgram()
    ) as NodePath<types.Program>;

    if (!programPath)
        return false;

    const clonedImportStatement = cloneNode(importStatement);
    programPath.node.body.unshift(clonedImportStatement);

    return true;
}

export default injectKiwuiImport;