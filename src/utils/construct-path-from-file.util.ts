/** @format */

import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

export const constructPathFormFile = (root: string, ...fragments: string[]) =>
    resolve(fileURLToPath(root), join(...fragments));
