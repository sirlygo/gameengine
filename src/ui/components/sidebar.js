export function createSidebar(appState) {
  const root = document.createElement('aside');
  root.className = 'left-sidebar panel';

  const title = document.createElement('h2');
  title.textContent = 'Project Explorer';

  const projectNode = document.createElement('section');
  projectNode.className = 'tree-group';
  projectNode.innerHTML = `<h3>${appState.project.name}</h3>`;

  const mapsList = document.createElement('ul');
  mapsList.className = 'tree-list';

  appState.project.maps.forEach((map) => {
    const item = document.createElement('li');
    item.textContent = `🗺 ${map.name}`;
    mapsList.appendChild(item);
  });

  const assetsList = document.createElement('ul');
  assetsList.className = 'tree-list';
  Object.entries(appState.project.assets).forEach(([bucket, entries]) => {
    const item = document.createElement('li');
    item.textContent = `📦 ${bucket} (${entries.length})`;
    assetsList.appendChild(item);
  });

  projectNode.append(mapsList, assetsList);
  root.append(title, projectNode);

  return { root };
}
