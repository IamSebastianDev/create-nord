/** @format */

export const trimPath = (path: string | undefined) => {
    return path?.trim().replaceAll(/\/+$/gim, '');
};
