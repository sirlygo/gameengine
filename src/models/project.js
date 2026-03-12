export function createStarterProject() {
  return {
    id: 'project-001',
    name: 'New RPG Project',
    metadata: {
      author: 'Unknown',
      createdAt: new Date().toISOString(),
      targetResolution: { width: 1280, height: 720 },
      tileSize: 32
    },
    maps: [
      {
        id: 'map-001',
        name: 'Starter Meadow',
        width: 40,
        height: 30,
        tilesetId: 'tileset-overworld-01'
      },
      {
        id: 'map-002',
        name: 'Village Center',
        width: 30,
        height: 30,
        tilesetId: 'tileset-town-01'
      }
    ],
    assets: {
      tilesets: [
        { id: 'tileset-overworld-01', name: 'Overworld Basics' },
        { id: 'tileset-town-01', name: 'Town Structures' }
      ],
      characters: [
        { id: 'char-hero-01', name: 'Hero Placeholder' },
        { id: 'char-npc-merchant', name: 'Merchant Placeholder' }
      ],
      audio: [{ id: 'bgm-field', name: 'Field Theme Placeholder' }]
    }
  };
}
