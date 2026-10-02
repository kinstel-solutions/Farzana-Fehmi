'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';
import { projectId, dataset } from './sanity/lib/client';

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'Fehmi Farzana Studio',

  projectId: projectId || 'o4igymxx',
  dataset: dataset || 'production',

  plugins: [structureTool()],

  releases: {
    enabled: false,
  },

  scheduledDrafts: {
    enabled: false,
  },

  schema: {
    types: schemaTypes,
  },
});
