// Types
import { types } from "@babel/core";
import { GeneratorMap } from "../generate.types";

// Generation functions
import { generateFunctionDeclaration } from "./generateFunctionDeclaration";
import { generateVariableDeclaration } from "./generateVariableDeclaration";
import { generateClassDeclaration } from "./generateClassDeclaration";

export const declarationGenerator: GeneratorMap<types.Declaration> = {
    FunctionDeclaration: generateFunctionDeclaration,
    VariableDeclaration: generateVariableDeclaration,
    ClassDeclaration: generateClassDeclaration,
    // ExportAllDeclaration: () => '',
    // ExportDefaultDeclaration: () => '',
    // ExportNamedDeclaration: () => '',
    // ImportDeclaration: () => '',
    // DeclareClass: () => '',
    // DeclareFunction: () => '',
    // DeclareInterface: () => '',
    // DeclareModule: () => '',
    // DeclareModuleExports: () => '',
    // DeclareTypeAlias: () => '',
    // DeclareOpaqueType: () => '',
    // DeclareVariable: () => '',
    // DeclareExportDeclaration: () => '',
    // DeclareExportAllDeclaration: () => '',
    // InterfaceDeclaration: () => '',
    // OpaqueType: () => '',
    // TypeAlias: () => '',
    // EnumDeclaration: () => '',
    // TSDeclareFunction: () => '',
    // TSInterfaceDeclaration: () => '',
    // TSTypeAliasDeclaration: () => '',
    // TSEnumDeclaration: () => '',
    // TSModuleDeclaration: () => '',
}