import { Node } from "@babel/core";

type Generator<T extends Node> = (node: T) => string;

// TODO: At the moment it's partial (with ?), because we don't support every node yet
// NOTE: We sort by aliases
export type GeneratorMap<Alias extends Node> = {
    [key in Alias["type"]]?: Generator<
        Extract<Alias, { type: key }>
    >;
};

export const isGenerationFunction = (value: any): 
    value is Generator<Node> => 
        typeof value === 'function';