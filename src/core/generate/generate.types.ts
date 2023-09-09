import { types } from "@babel/core";

export type PossibleAliases = types.Aliases[keyof types.Aliases];
type Generator<T extends PossibleAliases> = (scopable: T) => string;

// TODO: At the moment it's partial (with ?) because we don't support every statement
export type AliasMap<Alias extends PossibleAliases> = {
    [key in Alias["type"]]?: Generator<
        Extract<Alias, { type: key }>
    >;
};

export const isGenerationFunction = (value: any): 
    value is Generator<PossibleAliases> => 
        typeof value === 'function';