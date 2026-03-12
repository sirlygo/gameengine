export function createInspector() {
  const root = document.createElement('aside');
  root.className = 'right-sidebar panel';

  root.innerHTML = `
    <h2>Inspector</h2>
    <section class="inspector-group">
      <h3>Selection</h3>
      <p id="selection-target">No item selected</p>
    </section>
    <section class="inspector-group">
      <h3>Map Properties</h3>
      <ul>
        <li>Name: <strong id="map-prop-name">--</strong></li>
        <li>Size: <strong id="map-prop-size">--</strong></li>
        <li>Tileset: <strong id="map-prop-tileset">--</strong></li>
      </ul>
    </section>
  `;

  return {
    root,
    selectionTarget: root.querySelector('#selection-target'),
    mapName: root.querySelector('#map-prop-name'),
    mapSize: root.querySelector('#map-prop-size'),
    mapTileset: root.querySelector('#map-prop-tileset')
  };
}
