import { renderMapGrid } from '../ui/components/workspace.js';

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

  function getSelectedMap() {
    return appState.project.maps.find((map) => map.id === appState.app.selectedMapId) ?? null;
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

  function updateInspector() {
    const selectedMap = getSelectedMap();
    if (!selectedMap) {
      return;
    }

    ui.inspector.selectionTarget.textContent = `Map: ${selectedMap.name}`;
    ui.inspector.mapName.textContent = selectedMap.name;
    ui.inspector.mapSize.textContent = `${selectedMap.width} x ${selectedMap.height}`;
    ui.inspector.mapTileset.textContent = selectedMap.tilesetId;
  }


  function markSelectedMap() {
    ui.leftSidebar.root.querySelectorAll('[data-map-id]').forEach((node) => {
      node.classList.toggle('is-active', node.dataset.mapId === appState.app.selectedMapId);
    });
  }

  function updateWorkspace() {
    const selectedMap = getSelectedMap();
    if (!selectedMap) {
      return;
    }

    ui.workspace.mapMetaNode.textContent = `${selectedMap.name} · ${selectedMap.width}x${selectedMap.height} · tile ${appState.project.metadata.tileSize}px`;
    renderMapGrid({
      canvas: ui.workspace.canvas,
      map: selectedMap,
      tileSize: appState.project.metadata.tileSize
    });
  }


  function markSelectedTool() {
    ui.toolbar.querySelectorAll('[data-action^="tool:"]').forEach((node) => {
      node.classList.toggle('is-active', node.dataset.action === `tool:${appState.app.currentTool}`);
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
    markSelectedTool();
  }

  function handleSidebarAction(payload) {
    if (payload.type !== 'select-map' || !payload.mapId) {
      return;
    }

    appState.app.selectedMapId = payload.mapId;
    const selectedMap = getSelectedMap();

    if (!selectedMap) {
      return;
    }

    setStatus(`Map selected: ${selectedMap.name}`);
    addLog('info', `Sidebar action: selected map ${selectedMap.id}`);
    updateWorkspace();
    updateInspector();
    markSelectedMap();
  }

  function syncView() {
    renderLogs();
    updateWorkspace();
    updateInspector();
    markSelectedMap();
    markSelectedTool();
    setStatus(appState.app.statusMessage);
  }

  return {
    handleMenuAction,
    handleToolbarAction,
    handleSidebarAction,
    syncView,
    addLog
  };
}
