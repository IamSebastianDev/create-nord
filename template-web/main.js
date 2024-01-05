/** @format */

const { createComponent, render, grain, on, derived } = nord;
const index = grain(0);
const greetings = [
    'Hej Nørd!',
    'Hello Nørd!',
    'Hallo Nørd!',
    'Hei Nørd!',
    'Terve Nørd!',
    'Hallå Nørd!',
    'Bonjour Nørd!',
    'Ciao Nørd!',
    'Hola Nørd!',
    'Olá Nørd!',
    'Dag Nørd!',
    'Sveiki Nørd!',
];

const Greeting = createComponent((html) => {
    const index = grain(0);

    // Deriving the correct greeting from the currently set index
    const greeting = derived(index, (index) => greetings[index % greetings.length]);

    // Function to update the index by either adding or subtracting a value
    const shiftIdx = (value) => index.update((i) => i + value);

    return html`<div class="layout-row layout-medium">
        <button ${on('click', () => shiftIdx(-1))}>&#171;</button>
        <h1 class="title" title=${index}>${greeting}</h1>
        <button ${on('click', () => shiftIdx(1))}>&#187;</button>
    </div>`;
});

const App = createComponent((html) => {
    return html`<div class="logo">
            <div class="aurora"></div>
            <img alt="The Nørd logo." src="./nord-logo.png" />
        </div>
        ${Greeting({})}
        <h3 class="slim muted">edit <span class="code">'./main.js'</span> and save to reload.</h3>
        <div class="layout-row layout-center layout-medium muted">
            <a target="blank" rel="noreferrer noopener" href="https://nordjs.dev">docs</a> /
            <a target="blank" rel="noreferrer noopener" href="https://www.npmjs.com/package/@grainular/nord">npm</a> /
            <a target="blank" rel="noreferrer noopener" href="https://github.com/IamSebastianDev/nord">github</a>
        </div>`;
});

render(App, { target: document.querySelector('#app') });
