import { types } from "@babel/core";

// NOTE: We expose this because babel currently doesn't. 
export interface BaseNode {
    type: types.Node["type"];
    leadingComments?: types.Comment[] | null;
    innerComments?: types.Comment[] | null;
    trailingComments?: types.Comment[] | null;
    start?: number | null;
    end?: number | null;
    loc?: types.SourceLocation | null;
    range?: [number, number];
    extra?: Record<string, unknown>;
}