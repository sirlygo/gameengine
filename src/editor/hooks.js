export function createEditorHooks({ appState, ui }) {
  function getSelectedMap() {
    return appState.project.maps.find((map) => map.id === appState.app.selectedMapId) ?? null;
  }

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

  function renderMapSelection() {
    const selectedMap = getSelectedMap();
    const mapButtons = ui.leftSidebar.root.querySelectorAll('button[data-action="select-map"][data-map-id]');

    mapButtons.forEach((button) => {
      const isActive = selectedMap ? button.dataset.mapId === selectedMap.id : false;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    if (!selectedMap) {
      ui.workspace.mapNameNode.textContent = 'Map Workspace';
      ui.workspace.mapMetaNode.textContent = 'No map selected.';
      ui.inspector.selectionTarget.textContent = 'No item selected';
      return;
    }

    ui.workspace.mapNameNode.textContent = selectedMap.name;
    ui.workspace.mapMetaNode.textContent = `${selectedMap.width} × ${selectedMap.height} · Tile Size ${appState.project.metadata.tileSize}px`;
    ui.inspector.selectionTarget.textContent = `Map: ${selectedMap.name}`;

  }

  function renderActiveTool() {
    ui.toolbar.querySelectorAll('button[data-action^="tool:"]').forEach((button) => {
      const tool = button.dataset.action.replace('tool:', '');
      const isActive = tool === appState.app.currentTool;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
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
    renderActiveTool();
  }

  function handleMapSelected(mapId) {
    const map = appState.project.maps.find((candidate) => candidate.id === mapId);

    if (!map) {
      addLog('warn', `Map with id "${mapId}" was not found.`);
      return;
    }

    if (appState.app.selectedMapId === map.id) {
      setStatus(`Map already selected: ${map.name}`);
      return;
    }

    appState.app.selectedMapId = map.id;
    setStatus(`Selected map: ${map.name}`);
    addLog('info', `Map selected: ${map.name}`);
    renderMapSelection();
  }

  function syncView() {
    renderLogs();
    setStatus(appState.app.statusMessage);
    renderMapSelection();
    renderActiveTool();
  }

  return {
    handleMenuAction,
    handleToolbarAction,
    handleMapSelected,
    syncView,
    addLog
  };
}
