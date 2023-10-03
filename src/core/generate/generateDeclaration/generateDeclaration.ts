// Types
import { types } from "@babel/core";
import { GeneratorMap } from "../generate.types";

// Generation functions
import { generate } from "@/core";
import { generateFunctionDeclaration } from "./generateFunctionDeclaration";
import { generateVariableDeclaration } from "./generateVariableDeclaration";

export const declarationGenerator: GeneratorMap<types.Declaration> = {
    FunctionDeclaration: generateFunctionDeclaration,
    VariableDeclaration: generateVariableDeclaration,
    // ClassDeclaration: () => '',
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