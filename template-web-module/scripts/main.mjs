/** @format */

import { createComponent, render } from 'http://unpkg.com/@grainular/nord/dist/index.mjs';
import { Greeting } from './components/greeting.component.mjs';

const App = createComponent((html) => {
    return html`<div class="logo">
            <div class="aurora"></div>
            <img alt="The Nørd logo." src="./assets/nord-logo.png" />
        </div>
        ${Greeting({})}
        <h3 class="slim muted">edit <span class="code">'./scripts/main.mjs'</span> and save to reload.</h3>
        <div class="layout-row layout-center layout-medium muted">
            <a target="blank" rel="noreferrer noopener" href="https://nordjs.dev">docs</a> /
            <a target="blank" rel="noreferrer noopener" href="https://www.npmjs.com/package/@grainular/nord">npm</a> /
            <a target="blank" rel="noreferrer noopener" href="https://github.com/IamSebastianDev/nord">github</a>
        </div>`;
});

render(App, { target: document.querySelector('#app') });
