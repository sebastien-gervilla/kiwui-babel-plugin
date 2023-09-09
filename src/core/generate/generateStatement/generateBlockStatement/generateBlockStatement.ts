import { types } from "@babel/core";
import { generateFromArray } from "@/core";

export const generateBlockStatement = (block: types.BlockStatement) => `{\n${generateFromArray(block.body, ';\n')};\n}`;