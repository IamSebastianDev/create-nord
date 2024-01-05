/** @format */

import './style.css';
import { createComponent, render } from '@grainular/nord';
import { Greeting } from './components/greeting.component';
import logo from './assets/vite.svg';

const App = createComponent((html) => {
    return html`
        <div class="logo">
            <div class="aurora"></div>
            <img alt="The Nørd logo." src="./nord-logo.png" />
        </div>
        ${Greeting({})}
        <h3 class="slim muted">edit <span class="code">'./src/main.ts'</span> and save to reload.</h3>
        <div class="layout-row layout-center layout-medium muted">
            <a target="blank" rel="noreferrer noopener" href="https://nordjs.dev">docs</a> /
            <a target="blank" rel="noreferrer noopener" href="https://www.npmjs.com/package/@grainular/nord">npm</a> /
            <a target="blank" rel="noreferrer noopener" href="https://github.com/IamSebastianDev/nord">github</a>
        </div>
        <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://vitejs.dev/"
            class="vite-powered layout-center layout-row layout-medium"
        >
            <img src="${logo}" alt="vite" />
            <span>Powered by <strong>Vite</strong></span>
        </a>
    `;
});

render(App, { target: document.querySelector('#app') });
