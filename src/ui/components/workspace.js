export function createWorkspace() {
  const root = document.createElement('section');
  root.className = 'workspace panel';

  const header = document.createElement('header');
  header.className = 'workspace-header';
  header.innerHTML = `
    <h2>Map Workspace</h2>
    <p id="workspace-map-meta">No map selected.</p>
  `;

  const canvasContainer = document.createElement('div');
  canvasContainer.className = 'canvas-placeholder';

  const canvas = document.createElement('canvas');
  canvas.className = 'workspace-canvas';
  canvas.width = 960;
  canvas.height = 576;
  canvasContainer.appendChild(canvas);

  root.append(header, canvasContainer);

  return {
    root,
    canvas,
    mapMetaNode: header.querySelector('#workspace-map-meta')
  };
}

export function renderMapGrid({ canvas, map, tileSize }) {
  const ctx = canvas.getContext('2d');
  if (!ctx || !map) {
    return;
  }

  const maxWidth = canvas.width;
  const maxHeight = canvas.height;
  const mapPixelWidth = map.width * tileSize;
  const mapPixelHeight = map.height * tileSize;
  const scale = Math.min(maxWidth / mapPixelWidth, maxHeight / mapPixelHeight, 1);

  const drawWidth = Math.floor(mapPixelWidth * scale);
  const drawHeight = Math.floor(mapPixelHeight * scale);
  const offsetX = Math.floor((canvas.width - drawWidth) / 2);
  const offsetY = Math.floor((canvas.height - drawHeight) / 2);
  const tileDraw = tileSize * scale;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#141a22';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#1d2633';
  ctx.fillRect(offsetX, offsetY, drawWidth, drawHeight);

  ctx.strokeStyle = 'rgba(82, 167, 255, 0.18)';
  ctx.lineWidth = 1;

  for (let x = 0; x <= map.width; x += 1) {
    const lineX = offsetX + Math.round(x * tileDraw) + 0.5;
    ctx.beginPath();
    ctx.moveTo(lineX, offsetY);
    ctx.lineTo(lineX, offsetY + drawHeight);
    ctx.stroke();
  }

  for (let y = 0; y <= map.height; y += 1) {
    const lineY = offsetY + Math.round(y * tileDraw) + 0.5;
    ctx.beginPath();
    ctx.moveTo(offsetX, lineY);
    ctx.lineTo(offsetX + drawWidth, lineY);
    ctx.stroke();
  }

  ctx.strokeStyle = '#52a7ff';
  ctx.lineWidth = 2;
  ctx.strokeRect(offsetX, offsetY, drawWidth, drawHeight);
}
