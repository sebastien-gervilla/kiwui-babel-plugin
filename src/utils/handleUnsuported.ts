export const handleUnsuported = (unsuported: any, message: string) => {
    console.log(red + "Element not supported by kiwui-babel-plugin :\n" + reset);
    console.log(unsuported);
    console.log(blue + "\nThis could be a bug, please raise an issue on github." + reset);
    throw new Error(message);
}

const red = '\x1b[31m';
const reset = '\x1b[0m';
const blue = '\x1b[34m';