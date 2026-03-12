const MENU_GROUPS = [
  {
    label: 'File',
    actions: [
      { id: 'file:new-project', label: 'New Project' },
      { id: 'file:open-project', label: 'Open Project' },
      { id: 'file:save-project', label: 'Save Project' },
      { id: 'file:export', label: 'Export Build' }
    ]
  },
  {
    label: 'Edit',
    actions: [
      { id: 'edit:undo', label: 'Undo' },
      { id: 'edit:redo', label: 'Redo' },
      { id: 'edit:preferences', label: 'Preferences' }
    ]
  },
  {
    label: 'View',
    actions: [
      { id: 'view:toggle-grid', label: 'Toggle Grid' },
      { id: 'view:reset-layout', label: 'Reset Layout' }
    ]
  },
  {
    label: 'Run',
    actions: [{ id: 'run:playtest', label: 'Playtest' }]
  }
];

export function createMenuBar() {
  const container = document.createElement('nav');
  container.className = 'menu-bar';

  MENU_GROUPS.forEach((group) => {
    const details = document.createElement('details');
    details.className = 'menu-group';

    const summary = document.createElement('summary');
    summary.textContent = group.label;

    const list = document.createElement('ul');
    list.className = 'menu-list';

    group.actions.forEach((action) => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.action = action.id;
      button.textContent = action.label;
      item.appendChild(button);
      list.appendChild(item);
    });

    details.append(summary, list);
    container.appendChild(details);
  });

  return container;
}

export function bindMenuActions({ container, onAction }) {
  container.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) {
      return;
    }

    onAction(button.dataset.action);
    container.querySelectorAll('details[open]').forEach((node) => {
      node.removeAttribute('open');
    });
  });
}
