const TOOLBAR_ACTIONS = [
  { id: 'tool:select', label: 'Select' },
  { id: 'tool:paint', label: 'Paint' },
  { id: 'tool:erase', label: 'Erase' },
  { id: 'tool:event', label: 'Event' },
  { id: 'tool:region', label: 'Region' }
];

export function createToolbar() {
  const container = document.createElement('section');
  container.className = 'toolbar';

  TOOLBAR_ACTIONS.forEach((action) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tool-button';
    button.dataset.action = action.id;
    button.textContent = action.label;
    container.appendChild(button);
  });

  return container;
}

export function bindToolbarActions({ container, onAction }) {
  container.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) {
      return;
    }

    onAction(button.dataset.action);
  });
}
