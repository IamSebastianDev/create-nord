/** @format */

import { bold, cyan, green, red, underline } from 'kolorist';
import { selectTemplateVariants } from './lib/select-template-variant';
import { Args } from './types/args';
import { selectDirectory } from './lib/select-directory';
import ora from 'ora';
import { cp, readFile, readdir, rm, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import prompts from 'prompts';
import { getNameFromPath } from './utils/get-name-from-path.util';
import { isValidPackageName } from './utils/is-valid-package-name.util';
import { constructPathFormFile } from './utils/construct-path-from-file.util';
import { wait } from './utils/wait.util';
import { diffPaths } from './utils/diff-paths.util';
import { root } from './utils/root.util';
import { isEmpty } from './utils';

const [, , ...argv] = process.argv;
const args: Args = Object.fromEntries([
    ['target', null],
    ...argv.map((arg) => {
        const [key, value] = arg.split('=');
        const propKey = key.replaceAll('-', '');
        return [propKey, value ?? true];
    }),
]);

(async (args: Args) => {
    console.clear();
    console.log(bold(green(`🚀 Hej! Welcome to your new Nørd app... \n\n`)));

    // get input directory;
    const { dir, clear } = await selectDirectory(args.target);

    // check explicitly for false, as clear will be undefined when the
    // question is skipped
    if (clear === false) {
        console.log(red(`✖ Cancelled.`));
        process.exit(0);
    }

    const template = await selectTemplateVariants();

    // check if the template is a vite project, if yes, a project name should be selected
    // to set the package name
    let projectName: null | string = null;
    if (template && template.type.includes('vite') && dir) {
        const { name } = await prompts({
            type: 'text',
            name: 'name',
            message: 'Select a name for your new project.',
            initial: getNameFromPath(dir),
            validate: (value) =>
                isValidPackageName(value)
                    ? true
                    : `'${value}' is not a valid package name. See 'https://docs.npmjs.com/cli/v10/configuring-npm/package-json' for details`,
        });

        if (!name) {
            throw new Error(`Error: A name must be chosen to create the necessary package.json file.`);
        }

        projectName = name;
    }

    // After all choices are made, have the user confirm to proceed with the operation
    console.log('\n');
    const { confirmed } = await prompts({
        type: 'confirm',
        message: `A new ${underline(template.display + ' Template')} will be created here: ${cyan(dir)}. ${
            clear ? red('\n  Existing files in that directory will be deleted!') : ''
        }`,
        name: 'confirmed',
    });

    if (!confirmed) {
        console.log(red(`✖ Cancelled.`));
        process.exit(0);
    }

    // If the target directory should be cleared and is still not empty
    // (better to check twice) remove all contents of that directory
    if (clear && !isEmpty(dir)) {
        const spinner = ora({ spinner: 'simpleDots', text: bold(`Removing files in target directory...`) }).start();
        const files = await readdir(dir);
        for (const file of files) {
            if (existsSync(join(dir, file))) {
                await rm(join(dir, file), { recursive: true, force: true });
            }
        }
        spinner.stop();
    }

    // get the path to the correct template
    const templatePath = constructPathFormFile(import.meta.url, '../..', template.path);
    if (templatePath && existsSync(templatePath)) {
        const spinner = ora({ spinner: 'simpleDots', text: bold(`Copying template...`) }).start();
        await cp(templatePath, dir, { recursive: true });

        // If it is a package based template, the package name should be replaced
        if (template && template.type.includes(`vite`)) {
            const pkg = JSON.parse(await readFile(join(dir, `package.json`), { encoding: 'utf-8' }));
            pkg.name = projectName;
            await writeFile(join(dir, 'package.json'), JSON.stringify(pkg, null, 2), { encoding: 'utf-8' });
        }

        await wait();
        spinner.stop();
    }

    // log the success message
    console.log(green(bold(`\n👍🏻 Success. Your template was created.`)));
    console.log(`   You can now run the following commands:
    
        cd ${diffPaths(root('.'), dir)}
`);

    // If it is a vite based template, additional instructions should be logged,
    // to indicate that dependencies need to be installed.

    if (template && template.type.includes('vite')) {
        const ua = process.env.npm_config_user_agent;
        switch (true) {
            case ua?.includes(`yarn`):
                console.log(`        yarn`);
                console.log(`        yarn dev`);
                break;
            case ua?.includes(`npm`):
            default:
                console.log(`        npm install`);
                console.log(`        npm run dev`);
                break;
        }
    }

    console.log(`\n`);
})(args);
