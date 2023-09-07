import { types } from "@babel/core";
import { handleUnsuported } from "../../../utils/handleUnsuported";

const {
    isIdentifier
} = types;

export const generateRestElement = (element: types.RestElement) => {
    const { argument } = element;
    if (isIdentifier(argument))
        return `...${argument.name}`

    handleUnsuported(
        element,
        "Unsupported RestElement expression."
    );
}