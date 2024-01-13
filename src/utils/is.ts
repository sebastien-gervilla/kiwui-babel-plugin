// Simple checkers
import { BaseNode } from "@/types/babel.types";

export const isParenthesized = (node: BaseNode) => node?.extra?.parenthesized === true;