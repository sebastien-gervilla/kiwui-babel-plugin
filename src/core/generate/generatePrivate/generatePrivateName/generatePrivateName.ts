import { types } from "@babel/core";
import { generate } from "@/core";

export const generatePrivateName = (privateName: types.PrivateName) => `#${generate(privateName.id)}`;