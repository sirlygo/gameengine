export function createEditorHooks({ appState, ui }) {
  function addLog(level, message) {
    const entry = {
      id: crypto.randomUUID(),
      level,
      message,
      timestamp: new Date().toISOString()
    };

    appState.logs.unshift(entry);
    appState.logs = appState.logs.slice(0, 50);
    renderLogs();
  }

  function renderLogs() {
    ui.logPanel.entriesNode.innerHTML = '';

    appState.logs.forEach((log) => {
      const row = document.createElement('div');
      row.className = `log-entry log-${log.level}`;
      row.textContent = `[${new Date(log.timestamp).toLocaleTimeString()}] ${log.message}`;
      ui.logPanel.entriesNode.appendChild(row);
    });
  }

  function setStatus(message) {
    appState.app.statusMessage = message;
    ui.setStatus(message);
  }

  function handleMenuAction(action) {
    const placeholderActions = {
      'file:new-project': 'Create project wizard (planned).',
      'file:open-project': 'Open project dialog (planned).',
      'file:save-project': 'Save to local file (planned).',
      'file:export': 'Export runtime package (planned).',
      'edit:undo': 'Undo stack integration (planned).',
      'edit:redo': 'Redo stack integration (planned).',
      'edit:preferences': 'Preferences panel (planned).',
      'view:toggle-grid': 'Grid overlay toggle (planned).',
      'view:reset-layout': 'Layout reset (planned).'
    };

    if (placeholderActions[action]) {
      setStatus(`${action} triggered`);
      addLog('info', `${action}: ${placeholderActions[action]}`);
    }
  }

  function handleToolbarAction(action) {
    appState.app.currentTool = action.replace('tool:', '');
    setStatus(`Tool switched to ${appState.app.currentTool}`);
    addLog('info', `Toolbar action: ${action}`);
  }

  function syncView() {
    renderLogs();
    setStatus(appState.app.statusMessage);
  }

  return {
    handleMenuAction,
    handleToolbarAction,
    syncView,
    addLog
  };
}
