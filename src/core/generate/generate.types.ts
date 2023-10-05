import { Node } from "@babel/core";

type Generator<T extends Node> = (node: T) => string;

// NOTE: We sort by aliases
export type GeneratorMap<Alias extends Node> = {
    [key in Alias["type"]]?: Generator<
        Extract<Alias, { type: key }>
    >;
};

export const isGenerationFunction = (value: any): 
    value is Generator<Node> => 
        typeof value === 'function';