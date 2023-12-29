/** @format */

import { combined, createComponent, grain, on } from 'http://unpkg.com/@grainular/nord/dist/index.mjs';
import { greetings } from '../grains/greetings.grain.mjs';

export const Greeting = createComponent((html) => {
    const index = grain(0);

    // Deriving the correct greeting from the currently set index
    const greeting = combined([index, greetings], ([index, greetings]) => greetings[index % greetings.length]);

    // Function to update the index by either adding or subtracting a value
    const shiftIdx = (value) => index.update((i) => i + value);

    return html`<div class="layout-row layout-medium">
        <button ${on('click', () => shiftIdx(-1))}>&#171;</button>
        <h1 class="title" title=${index}>${greeting}</h1>
        <button ${on('click', () => shiftIdx(1))}>&#187;</button>
    </div>`;
});
