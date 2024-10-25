import {APP_BASE_HREF} from '@angular/common';
import {CommonEngine} from '@angular/ssr';
import express from 'express';
import {fileURLToPath} from 'node:url';
import {dirname, join, resolve} from 'node:path';
import bootstrap from './src/main.server';
import {API_URL, SSR_ONLY_UPDATE_STATUS_HANDLER} from './src/app/ssr.providers';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const {protocol, originalUrl, baseUrl, headers} = req;

    const apiUrl = req.header('x-gw-url') ?? 'http://localhost:3000';

    console.log("req from url", originalUrl);

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [
          {provide: APP_BASE_HREF, useValue: baseUrl},
          {provide: API_URL, useValue: apiUrl},
          {
            provide: SSR_ONLY_UPDATE_STATUS_HANDLER,
            useValue: (code: number) => res.sendStatus(code)
          }
        ],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Server http://localhost:${port}`);
  });
}

run();
