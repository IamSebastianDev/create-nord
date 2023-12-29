/** @format */

export const diffPaths = (current: string, target: string) => {
    return target.replace(current, '.');
};
