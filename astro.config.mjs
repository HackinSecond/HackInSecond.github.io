// Astro configuration. Everything deployment-specific comes from two env vars so the
// same code builds for GitHub Pages (default), Vercel, or a custom domain.
//   SITE_URL  - public origin, no trailing slash. Default: https://hackinsecond.github.io
//   BASE_PATH - "/" for a user site (default). Only use "/repo-name/" for a project site.
import { defineConfig } from 'astro/config';

const site = (process.env.SITE_URL || 'https://hackinsecond.github.io').replace(/\/$/, '');
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
});
