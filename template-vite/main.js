/** @format */

import './style.css';
import { render, createComponent } from '@grainular/nord';
import logo from '/lib/assets/vite.svg';
import { Greeting } from './lib/components/greeting.component';

const App = createComponent((html) => {
    return html`
        <div class="logo">
            <img alt="The Nørd logo." src="./nord-logo.png" />
        </div>
        ${Greeting({})}
        <h3 class="slim muted">edit <span class="code">'./main.js'</span> and save to reload.</h3>
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
