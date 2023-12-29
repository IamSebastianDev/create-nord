/** @format */

export type Template = {
    type: string;
    display: string;
    description: string;
    color: (str: string | number) => string;
    path: string;
};
