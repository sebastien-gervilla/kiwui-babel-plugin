import { types } from '@babel/core';
import { generate } from '@/core';

export const generateClassProperty = (property: types.ClassProperty | types.ClassPrivateProperty) => {
    const key = generate(property.key);
    if (!property.value)
        return `${key};`;

    const value = generate(property.value);
    return `${key} = ${value};`;
}