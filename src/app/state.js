import { createStarterProject } from '../models/project.js';

export function createInitialState() {
  return {
    app: {
      name: 'RuneForge Editor',
      version: '0.1.0',
      currentTool: 'select',
      selectedAssetId: null,
      selectedMapId: 'map-001',
      statusMessage: 'Ready',
      isDirty: false
    },
    project: createStarterProject(),
    logs: [
      {
        id: crypto.randomUUID(),
        level: 'info',
        message: 'Editor shell initialized.',
        timestamp: new Date().toISOString()
      }
    ]
  };
}
