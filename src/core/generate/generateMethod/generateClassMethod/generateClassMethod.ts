import { types } from "@babel/core";
import { generate, generateFromArray } from "@/core";

export const generateClassMethod = (method: types.ClassMethod | types.ClassPrivateMethod) => {
    const key = generate(method.key);
    const params = generateFromArray(method.params);
    const body = generate(method.body);

    let prefixes = method.static ? `static ` : '';
    if (method.async)
        prefixes += `async `;
    if (method.kind !== 'method' && method.kind !== 'constructor')
        prefixes += `${method.kind} `;

    return prefixes + `${key}(${params}) ${body}`;
}