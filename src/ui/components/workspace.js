export function createWorkspace() {
  const root = document.createElement('section');
  root.className = 'workspace panel';

  const header = document.createElement('header');
  header.className = 'workspace-header';
  header.innerHTML = `
    <h2 data-role="workspace-map-name">Map Workspace</h2>
    <p data-role="workspace-map-meta">Canvas + editing tools will be added in v0.2.</p>
  `;

  const canvasPlaceholder = document.createElement('div');
  canvasPlaceholder.className = 'canvas-placeholder';
  canvasPlaceholder.innerHTML = `
    <div class="grid-mark"></div>
    <p>Editor Canvas Area</p>
  `;

  root.append(header, canvasPlaceholder);

  return {
    root,
    canvasPlaceholder,
    mapNameNode: header.querySelector('[data-role="workspace-map-name"]'),
    mapMetaNode: header.querySelector('[data-role="workspace-map-meta"]')
  };
}
