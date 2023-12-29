/** @format */

import { existsSync } from 'fs';
import { blue, bold, red } from 'kolorist';
import prompts from 'prompts';
import { isEmpty } from '../utils';
import { root } from '../utils/root.util';

export const selectDirectory = async (target?: string): Promise<{ dir: string; clear: undefined | boolean }> => {
    try {
        const { dir, clear } = await prompts([
            {
                type: 'text',
                initial: target ?? 'nord',
                message: 'Select a directory for your application:',
                format: (dir) => root(dir),
                name: 'dir',
            },
            {
                type: (path) => {
                    return !existsSync(path) || isEmpty(path) ? null : 'select';
                },
                name: 'clear',
                message: 'The selected directory is not empty. Continue anyway?',
                choices: [
                    {
                        title: blue(`Continue`),
                        description: `Existing files will be deleted!`,
                        value: true,
                    },
                    {
                        title: bold(red(`Cancel`)),
                        description: `Will exist workflow.`,
                        value: false,
                    },
                ],
            },
        ]);

        return { dir, clear };
    } catch (e) {
        throw new Error();
    }
};
