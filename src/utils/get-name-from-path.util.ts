/** @format */

export const getNameFromPath = (path: string) => {
    return path.split('/').reverse().at(0);
};
