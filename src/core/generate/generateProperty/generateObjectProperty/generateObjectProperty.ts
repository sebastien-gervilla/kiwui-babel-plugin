import { types } from "@babel/core";
import { generate } from "@/core";

export const generateObjectProperty = (property: types.ObjectProperty) => {
    const key = generate(property.key);
    const value = generate(property.value);
    return `${key}: ${value}`;
}