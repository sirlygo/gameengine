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
      <h3>Properties</h3>
      <ul>
        <li>Position: --</li>
        <li>Layer: --</li>
        <li>Collision: --</li>
      </ul>
    </section>
  `;

  return {
    root,
    selectionTarget: root.querySelector('#selection-target')
  };
}
