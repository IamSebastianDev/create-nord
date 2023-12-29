/** @format */

import prompts from 'prompts';
import { Template } from '../types/templates';
import { blue, cyan, green, magenta, yellow } from 'kolorist';

const templates: Template[] = [
    {
        type: 'web',
        display: 'Nørd Web',
        color: yellow,
        path: './template-web',
        description: 'Creates a single file HTML based application.',
    },
    {
        type: 'web-module',
        display: 'Nørd Web (Module)',
        color: magenta,
        path: './template-web-module',
        description: 'Creates a modern, module based Nørd application',
    },
    {
        type: 'vite',
        display: 'Nørd Vite',
        color: cyan,
        path: './template-vite',
        description: 'Creates a modern Vite based Nørd application.',
    },
    {
        type: 'vite-ts',
        display: 'Nørd Vite Typescript',
        color: blue,
        path: './template-vite-ts',
        description: 'Creates a modern Vite based Nørd application with TypeScript.',
    },
];

export const selectTemplateVariants = async (): Promise<Template> => {
    try {
        const selection = await prompts({
            type: 'select',
            name: 'template',
            message: 'Select a template to create',
            initial: 0,
            choices: [
                ...templates.map((template) => ({
                    title: template.color(template.display),
                    description: template.description,
                    value: template,
                })),
            ],
        });

        const { template } = selection;
        return template;
    } catch (e) {
        throw new Error();
    }
};
