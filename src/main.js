import { createInitialState } from './app/state.js';
import { createApp } from './app/bootstrap.js';

const root = document.getElementById('app');

if (!root) {
  throw new Error('Root app node #app was not found.');
}

const appState = createInitialState();
createApp({ root, appState });
