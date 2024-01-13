// Types
import { types } from "@babel/core";
import { GeneratorMap } from "../generate.types";

// Generation functions
import { generate } from "@/core";


export const typescriptGenerator: GeneratorMap<types.TypeScript> = {
    // TSParameterProperty
    // TSDeclareFunction
    // TSDeclareMethod
    // TSQualifiedName
    // TSCallSignatureDeclaration
    // TSConstructSignatureDeclaration
    // TSPropertySignature
    // TSMethodSignature
    // TSIndexSignature
    // TSAnyKeyword
    // TSBooleanKeyword
    // TSBigIntKeyword
    // TSIntrinsicKeyword
    // TSNeverKeyword
    // TSNullKeyword
    // TSNumberKeyword
    // TSObjectKeyword
    // TSStringKeyword
    // TSSymbolKeyword
    // TSUndefinedKeyword
    // TSUnknownKeyword
    // TSVoidKeyword
    // TSThisType
    // TSFunctionType
    // TSConstructorType
    // TSTypeReference
    // TSTypePredicate
    // TSTypeQuery
    // TSTypeLiteral
    // TSArrayType
    // TSTupleType
    // TSOptionalType
    // TSRestType
    // TSNamedTupleMember
    // TSUnionType
    // TSIntersectionType
    // TSConditionalType
    // TSInferType
    // TSParenthesizedType
    // TSTypeOperator
    // TSIndexedAccessType
    // TSMappedType
    // TSLiteralType
    // TSExpressionWithTypeArguments
    TSInterfaceDeclaration: () => '',
    // TSInterfaceBody
    TSTypeAliasDeclaration: () => '',
    // TSInstantiationExpression
    TSAsExpression: ({ expression }) => generate(expression),
    // TSSatisfiesExpression
    // TSTypeAssertion
    TSEnumDeclaration: () => '',
    // TSEnumMember
    // TSModuleDeclaration
    // TSModuleBlock
    // TSImportType
    // TSImportEqualsDeclaration
    // TSExternalModuleReference
    // TSNonNullExpression
    // TSExportAssignment
    // TSNamespaceExportDeclaration
    // TSTypeAnnotation
    // TSTypeParameterInstantiation
    // TSTypeParameterDeclaration
    // TSTypeParameter
}