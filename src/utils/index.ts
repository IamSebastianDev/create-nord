/** @format */

import { readdirSync } from 'node:fs';

export const isEmpty = (path: string) => {
    const files = readdirSync(path);
    return files.length === 0;
};
