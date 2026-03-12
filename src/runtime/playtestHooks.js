export function setupRuntimeHooks({ appState, ui }) {
  function handleMenuAction(action) {
    if (action !== 'run:playtest') {
      return;
    }

    const message = 'Playtest runtime bridge not yet implemented (planned for v0.4+).';
    appState.app.statusMessage = 'Playtest requested';
    ui.setStatus(appState.app.statusMessage);

    const row = document.createElement('div');
    row.className = 'log-entry log-warn';
    row.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    ui.logPanel.entriesNode.prepend(row);
  }

  return {
    handleMenuAction
  };
}
