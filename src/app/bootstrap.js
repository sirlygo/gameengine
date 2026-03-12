import { renderEditorLayout } from '../ui/layout/editorLayout.js';
import { bindMenuActions } from '../ui/components/menuBar.js';
import { bindToolbarActions } from '../ui/components/toolbar.js';
import { bindSidebarActions } from '../ui/components/sidebar.js';
import { createEditorHooks } from '../editor/hooks.js';
import { setupRuntimeHooks } from '../runtime/playtestHooks.js';

export function createApp({ root, appState }) {
  root.innerHTML = '';

  const ui = renderEditorLayout({ root, appState });
  const editorHooks = createEditorHooks({ appState, ui });
  const runtimeHooks = setupRuntimeHooks({ appState, ui });

  bindMenuActions({
    container: ui.menuBar,
    onAction: (action) => {
      editorHooks.handleMenuAction(action);
      runtimeHooks.handleMenuAction(action);
    }
  });

  bindToolbarActions({
    container: ui.toolbar,
    onAction: (action) => editorHooks.handleToolbarAction(action)
  });

  bindSidebarActions({
    container: ui.leftSidebar.root,
    onSelectMap: (mapId) => editorHooks.handleMapSelected(mapId)
  });

  editorHooks.syncView();
}
