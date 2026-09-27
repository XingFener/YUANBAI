import { createServer } from 'node:http';
import { open, readFile, stat } from 'node:fs/promises';
import { resolve, dirname, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml', '.mp3':'audio/mpeg', '.mp4':'video/mp4', '.ttf':'font/ttf', '.json':'application/json; charset=utf-8' };
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://127.0.0.1:${port}`);
    const path = resolve(root, '.' + decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
    if (!path.startsWith(root + sep)) { response.writeHead(403).end(); return; }
    const info = await stat(path);
    if (!info.isFile()) throw new Error('Not a file');
    const extension = extname(path);
    const etag = `W/\"${info.size.toString(16)}-${Math.trunc(info.mtimeMs).toString(16)}\"`;
    const headers = {
      'Content-Type': types[extension] || 'application/octet-stream',
      'Accept-Ranges': 'bytes',
      'Cache-Control': extension === '.html' || extension === '.js' || extension === '.css'
        ? 'no-cache'
        : 'public, max-age=0, must-revalidate',
      ETag: etag
    };
    if (request.headers['if-none-match'] === etag) {
      response.writeHead(304, headers).end();
      return;
    }
    const range = request.headers.range;
    if (range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (!match) { response.writeHead(416, { 'Content-Range': `bytes */${info.size}` }).end(); return; }
      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Math.min(Number(match[2]), info.size - 1) : info.size - 1;
      if (start > end || start >= info.size) { response.writeHead(416, { 'Content-Range': `bytes */${info.size}` }).end(); return; }
      const handle = await open(path, 'r');
      const data = Buffer.alloc(end - start + 1);
      try { await handle.read(data, 0, data.length, start); } finally { await handle.close(); }
      response.writeHead(206, { ...headers, 'Content-Length': data.length, 'Content-Range': `bytes ${start}-${end}/${info.size}` });
      response.end(data);
      return;
    }
    const data = await readFile(path);
    response.writeHead(200, { ...headers, 'Content-Length': data.length });
    response.end(data);
  } catch {
    console.error('404', request.url);
    response.writeHead(404, { 'Content-Type':'text/plain' }).end('Not found');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`YUANBAI is ready at http://127.0.0.1:${port}`));
