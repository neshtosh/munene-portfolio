import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { projects } from './src/data/projects';
import { SITE_URL, STATIC_PATHS, pageForPath, projectPath } from './src/data/seo';

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setTag(html: string, pattern: RegExp, tag: string) {
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

function renderHead(template: string, path: string) {
  const page = pageForPath(path);
  const url = `${SITE_URL}${path}`;
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const meta = (attr: string, key: string, content: string) =>
    [new RegExp(`<meta ${attr}="${key}" content="[^"]*" />`), `<meta ${attr}="${key}" content="${content}" />`] as const;

  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  for (const [pattern, tag] of [
    meta('name', 'description', description),
    meta('property', 'og:title', title),
    meta('property', 'og:description', description),
    meta('property', 'og:url', url),
    meta('property', 'og:image', page.image),
    meta('name', 'twitter:card', page.largeImage ? 'summary_large_image' : 'summary'),
    meta('name', 'twitter:title', title),
    meta('name', 'twitter:description', description),
    meta('name', 'twitter:image', page.image),
  ]) {
    html = setTag(html, pattern, tag);
  }
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  if (page.jsonLd) {
    const json = JSON.stringify(page.jsonLd).replace(/</g, '\\u003c');
    html = html.replace('</head>', `    <script type="application/ld+json">${json}</script>\n  </head>`);
  }
  return html;
}

// Writes a static HTML file per route so crawlers and link previews get the right
// title, description and image without running JS, and generates the sitemap.
function seoPages(): Plugin {
  let root = process.cwd();
  let outDir = 'dist';
  return {
    name: 'seo-pages',
    apply: 'build',
    configResolved(config) {
      root = config.root;
      outDir = resolve(root, config.build.outDir);
    },
    closeBundle() {
      const template = readFileSync(resolve(outDir, 'index.html'), 'utf8');
      const paths = [...STATIC_PATHS, ...projects.map((project) => projectPath(project.id))];

      for (const path of paths) {
        const file = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
        const target = resolve(outDir, file);
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, renderHead(template, path));
      }

      mkdirSync(resolve(outDir, 'og'), { recursive: true });
      for (const project of projects) {
        try {
          copyFileSync(
            resolve(root, 'src/assets/project-images', project.imageFilename),
            resolve(outDir, 'og', project.imageFilename),
          );
        } catch {
          this.warn(`Missing image for project "${project.id}": ${project.imageFilename}`);
        }
      }

      const lastmod = new Date().toISOString().slice(0, 10);
      const urls = paths
        .map((path) => `  <url><loc>${SITE_URL}${path}</loc><lastmod>${lastmod}</lastmod></url>`)
        .join('\n');
      writeFileSync(
        resolve(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seoPages()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
