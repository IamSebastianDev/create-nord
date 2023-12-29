/** @format */

import { resolve, join } from 'node:path';
export const root = (...fragments: string[]) => resolve(join(process.cwd(), ...fragments));
