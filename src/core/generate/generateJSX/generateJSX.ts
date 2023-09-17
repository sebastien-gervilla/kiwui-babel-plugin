// Types
import { types } from "@babel/core";
import { AliasMap } from "../generate.types";
import { JSX } from "@/helpers";

// Generation functions
import { generate } from "@/core";
import { generateJSXAttribute } from "./generateJSXAttribute";
import { generateJSXElement } from "./generateJSXElement";
import { generateJSXMemberExpression } from "./generateMemberExpression";
import { generateJSXSpreadAttribute } from "./generateJSXSpreadAttribute";
import { generateJSXText } from "./generateJSXText";
import { generateJSXFragment } from "./generateJSXFragment";

export const jsxGenerator: AliasMap<types.JSX> = {
    JSXAttribute: generateJSXAttribute,
    // JSXClosingElement: () => '',
    JSXElement: generateJSXElement,
    JSXEmptyExpression: () => '', // NOTE: This helps us not rendering empty "children"
    JSXExpressionContainer: ({ expression }) => generate(expression),
    // JSXSpreadChild: () => '',
    JSXIdentifier: ({ name }) => name,
    JSXMemberExpression: generateJSXMemberExpression,
    // JSXNamespacedName: () => '',
    // JSXOpeningElement: () => '',
    JSXSpreadAttribute: generateJSXSpreadAttribute,
    JSXText: generateJSXText,
    JSXFragment: generateJSXFragment,
    // JSXOpeningFragment: () => '',
    // JSXClosingFragment: () => '',
}