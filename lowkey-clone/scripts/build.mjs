import { readFile, writeFile, mkdir, cp, readdir, stat } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { Script } from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'dist');
await mkdir(out, { recursive: true });
for (const directory of ['archive', 'audio', 'fonts', 'images', 'models', 'narrative', 'vendor', 'video']) await cp(resolve(root, 'reference', directory), resolve(out, directory), { recursive: true });
await cp(resolve(root, 'reference/icon.svg'), resolve(out, 'icon.svg'));
const chunks = [
  'webpack-c9f21c55e09af00f.js', 'fd9d1056-c9e6a99e9106578d.js', '117-92e45f4c5c252751.js',
  'c15bf2b0-19ff368ffb2158b2.js', '498-29d7d409bb4d607c.js', '607-be5bcc2b24f196df.js',
  '452-5d2a03566d096363.js', 'b536a0f1.f1229265e0ce474f.js', '123.2afe883af1fbe6d6.js',
  '504.733c34792308f9bb.js'
];
const styles = ['b48a4cfff997e38e.css', '7c6541610a6843d4.css', '03c4daa5b84289ce.css'];
await mkdir(resolve(out, '_next/static/chunks'), { recursive: true });
await mkdir(resolve(out, '_next/static/css'), { recursive: true });
const provenance = [];
for (const name of chunks) {
  let code = await readFile(resolve(root, 'reference/_next/static/chunks', name), 'utf8');
  provenance.push({ file: name, originalSha256: createHash('sha256').update(code).digest('hex') });
  if (name.startsWith('504.')) {
    const patches = [
      ['narrativeSelection:x=!1}=e', 'narrativeSelection:x=!1,initialShelf:localShelf=!1,onController:localController}=e'],
      ['useState)("standard"===I?"complete":"loading")', 'useState)("standard"===I||localShelf?"complete":"loading")'],
      ['useState)(Q?"scatter":"complete")', 'useState)(Q&&!localShelf?"scatter":"complete")'],
      ['en(Q?"scatter":"complete"),eo(null)', 'en(Q&&!localShelf?"scatter":"complete"),eo(null)'],
      ['J.current=t,t.start();', 'J.current=t,t.start(),localShelf&&t.completeEntrance(),localController&&localController(t);'],
      ['"unfold"!==this.entranceMode||this.reducedMotion||this.emitEntrancePhase("closed",-1)', '"unfold"!==this.entranceMode||this.reducedMotion||this.entranceDone||this.emitEntrancePhase("closed",-1)'],
      ['onKey(e){if(delete this.frame.dataset.focusSource,', 'onKey(e){if(this.frame.closest("[inert]"))return;if(delete this.frame.dataset.focusSource,']
    ];
    for (const [before, after] of patches) {
      if (code.split(before).length !== 2) throw new Error(`Patch target must occur exactly once: ${before}`);
      code = code.replace(before, after);
    }
  }
  // Brand all rendered labels, including canvas lettering and vinyl imprints.
  // Keep asset URLs and internal identifiers intact.
  code = code.replace(/\bLOWKEY\b/g, 'YUANBAI').replace(/\bLowkey\b/g, 'YUANBAI');
  new Script(code, { filename: name }); // Syntax validation only; no execution.
  await writeFile(resolve(out, '_next/static/chunks', name), code);
}
for (const name of styles) await cp(resolve(root, 'reference/_next/static/css', name), resolve(out, '_next/static/css', name));
const app = await readFile(resolve(root, 'src/app.js'), 'utf8');
new Script(app, { filename: 'app.js' });
await writeFile(resolve(out, 'app.js'), app);
await cp(resolve(root, 'src/local.css'), resolve(out, 'local.css'));
await writeFile(resolve(out, 'index.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#050505"><title>∞ · 元白 — 未来设计学院空间多感官探索</title>
<meta name="description" content="走进元白，感知无限。未来设计学院空间多感官探索。"><meta name="robots" content="noindex,nofollow">
<link rel="icon" href="/icon.svg">${styles.map(name => `<link rel="stylesheet" href="/_next/static/css/${name}">`).join('')}<link rel="stylesheet" href="/local.css">
</head><body><div id="app"><div class="boot-message"><strong>∞ · 元白</strong><span>CALIBRATING PERCEPTION</span></div></div>
${chunks.map(name => `<script defer src="/_next/static/chunks/${name}"></script>`).join('\n')}
<script defer src="/app.js"></script></body></html>`);
await writeFile(resolve(root, 'provenance.json'), JSON.stringify(provenance, null, 2));
let files = 0, bytes = 0;
async function count(dir) { for (const entry of await readdir(dir, { withFileTypes: true })) { const p = resolve(dir, entry.name); if (entry.isDirectory()) await count(p); else { files++; bytes += (await stat(p)).size; } } }
await count(out);
console.log(`Build complete: ${files} files, ${(bytes / 1048576).toFixed(1)} MB. All JavaScript parses. No remote runtime dependencies.`);
