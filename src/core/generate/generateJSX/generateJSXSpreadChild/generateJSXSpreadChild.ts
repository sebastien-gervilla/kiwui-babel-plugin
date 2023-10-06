import { types } from "@babel/core";
import { generate } from "@/core";

export const generateJSXSpreadChild = (jsx: types.JSXSpreadChild) => `...${generate(jsx.expression)}`;