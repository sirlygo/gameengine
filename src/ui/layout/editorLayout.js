import { createMenuBar } from '../components/menuBar.js';
import { createToolbar } from '../components/toolbar.js';
import { createSidebar } from '../components/sidebar.js';
import { createWorkspace } from '../components/workspace.js';
import { createInspector } from '../components/inspector.js';
import { createLogPanel } from '../components/logPanel.js';

export function renderEditorLayout({ root, appState }) {
  const shell = document.createElement('div');
  shell.className = 'editor-shell';

  const header = document.createElement('header');
  header.className = 'app-header';
  header.innerHTML = `
    <h1>${appState.app.name}</h1>
    <p>Project: ${appState.project.name} · v${appState.app.version}</p>
  `;

  const menuBar = createMenuBar();
  const toolbar = createToolbar();

  const body = document.createElement('main');
  body.className = 'editor-body';

  const leftSidebar = createSidebar(appState);
  const workspace = createWorkspace();
  const inspector = createInspector();

  body.append(leftSidebar.root, workspace.root, inspector.root);

  const logPanel = createLogPanel();

  shell.append(header, menuBar, toolbar, body, logPanel.root);
  root.appendChild(shell);

  return {
    root: shell,
    menuBar,
    toolbar,
    leftSidebar,
    workspace,
    inspector,
    logPanel,
    setStatus(message) {
      logPanel.statusNode.textContent = message;
    }
  };
}
