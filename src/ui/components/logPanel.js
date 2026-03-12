export function createLogPanel() {
  const root = document.createElement('section');
  root.className = 'log-panel panel';

  root.innerHTML = `
    <div class="log-header">
      <h2>Output</h2>
      <p id="status-text">Ready</p>
    </div>
    <div id="log-entries" class="log-entries"></div>
  `;

  return {
    root,
    statusNode: root.querySelector('#status-text'),
    entriesNode: root.querySelector('#log-entries')
  };
}
