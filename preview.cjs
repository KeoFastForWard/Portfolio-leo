const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');

const host = '127.0.0.1';
const port = 4173;
const url = `http://${host}:${port}/`;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4'
};

function openBrowser() {
  if (process.platform !== 'win32' || !process.argv.includes('--open')) return;
  const browser = spawn('explorer.exe', [url], { stdio: 'ignore', windowsHide: true });
  browser.on('error', () => console.log(`Abri ${url} en el navegador.`));
  browser.unref();
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  let file;
  try {
    const pathname = decodeURIComponent(new URL(req.url, url).pathname);
    file = path.resolve(__dirname, pathname === '/' ? 'index.html' : `.${pathname}`);
  } catch {
    res.writeHead(400).end();
    return;
  }

  const contentType = mime[path.extname(file).toLowerCase()];
  if (!file.startsWith(__dirname + path.sep) || !contentType) {
    res.writeHead(404).end();
    return;
  }

  fs.stat(file, (error, stat) => {
    if (error || !stat.isFile()) {
      res.writeHead(404).end();
      return;
    }

    const headers = {
      'Content-Type': contentType,
      'Cache-Control': 'no-store',
      'X-Portfolio-Preview': 'leonel-kunst',
      'Accept-Ranges': 'bytes'
    };
    let start = 0;
    let end = stat.size - 1;
    let status = 200;

    if (req.headers.range) {
      const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if (range && (range[1] || range[2])) {
        start = range[1] ? Number(range[1]) : Math.max(0, stat.size - Number(range[2]));
        end = range[1] && range[2] ? Math.min(end, Number(range[2])) : end;
      }
      if (!range || (!range[1] && !range[2]) || start > end) {
        res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` }).end();
        return;
      }
      status = 206;
      headers['Content-Range'] = `bytes ${start}-${end}/${stat.size}`;
    }

    headers['Content-Length'] = end - start + 1;
    res.writeHead(status, headers);
    if (req.method === 'HEAD' || stat.size === 0) {
      res.end();
      return;
    }
    const stream = fs.createReadStream(file, { start, end });
    stream.on('error', () => res.destroy());
    res.on('close', () => stream.destroy());
    stream.pipe(res);
  });
});

server.on('error', (error) => {
  if (error.code !== 'EADDRINUSE') {
    console.error(error.message);
    process.exitCode = 1;
    return;
  }
  const check = http.request(url, { method: 'HEAD', timeout: 2000 }, (res) => {
    res.resume();
    if (res.headers['x-portfolio-preview'] === 'leonel-kunst') {
      console.log(`El portfolio ya esta abierto en ${url}`);
      openBrowser();
    } else {
      console.error(`El puerto ${port} esta ocupado por otro servicio.`);
      process.exitCode = 1;
    }
  });
  check.on('timeout', () => check.destroy(new Error('El servidor local no responde.')));
  check.on('error', (err) => { console.error(err.message); process.exitCode = 1; });
  check.end();
});

server.listen(port, host, () => {
  console.log(`Portfolio: ${url}`);
  openBrowser();
});
