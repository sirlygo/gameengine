export function createSidebar(appState) {
  const root = document.createElement('aside');
  root.className = 'left-sidebar panel';

  const title = document.createElement('h2');
  title.textContent = 'Project Explorer';

  const projectNode = document.createElement('section');
  projectNode.className = 'tree-group';
  projectNode.innerHTML = `<h3>${appState.project.name}</h3>`;

  const mapsHeader = document.createElement('h3');
  mapsHeader.textContent = 'Maps';

  const mapsList = document.createElement('ul');
  mapsList.className = 'tree-list';

  appState.project.maps.forEach((map) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tree-item-button';
    button.dataset.action = 'select-map';
    button.dataset.mapId = map.id;
    button.textContent = `🗺 ${map.name}`;
    item.appendChild(button);
    mapsList.appendChild(item);
  });

  const assetsHeader = document.createElement('h3');
  assetsHeader.textContent = 'Assets';

  const assetsList = document.createElement('ul');
  assetsList.className = 'tree-list';
  Object.entries(appState.project.assets).forEach(([bucket, entries]) => {
    const item = document.createElement('li');
    item.textContent = `📦 ${bucket} (${entries.length})`;
    assetsList.appendChild(item);
  });

  projectNode.append(mapsHeader, mapsList, assetsHeader, assetsList);
  root.append(title, projectNode);

  return { root };
}

export function bindSidebarActions({ container, onAction }) {
  container.addEventListener('click', (event) => {
    const target = event.target.closest('button[data-action]');
    if (!target) {
      return;
    }

    onAction({
      type: target.dataset.action,
      mapId: target.dataset.mapId ?? null
    });
  });
}
