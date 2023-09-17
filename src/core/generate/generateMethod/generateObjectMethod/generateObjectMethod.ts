import { types } from "@babel/core";
import { generate, generateFromArray } from "@/core";

export const generateObjectMethod = (method: types.ObjectMethod) => {
    const key = generate(method.key);
    const params = generateFromArray(method.params);
    const body = generate(method.body);

    let prefixes = method.async ? `async ` : '';
    if (method.kind !== 'method')
        prefixes += `${method.kind} `;

    return prefixes + `${key}(${params}) ${body}`;
}