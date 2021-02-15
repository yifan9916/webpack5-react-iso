import fs from 'fs-extra';
import path from 'path';
import express from 'express';
import serialize from 'serialize-javascript';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';

import { Component } from './Component';

const PUBLIC_DIR = path.resolve(`${process.env.CLIENT_OUTPUT_PATH}/assets`);
const INITIAL_DATA_PROPERTY = '__INITIAL_DATA__';

const webpackManifest = fs.readJSONSync(
  `./${process.env.CLIENT_OUTPUT_PATH}/assets/manifest.json`,
);

const app = express();

app.disable('x-powered-by');
app.disable('etag');

app.use('/assets', express.static(PUBLIC_DIR));

app.get('/healthz', (req, res) => {
  res.send({ message: 'Ok!' });
});

app.get('/', (req, res) => {
  const initialProps = {
    title: 'Title',
  };

  const appMarkup = ReactDOMServer.renderToString(<Component />);
  const helmet = Helmet.renderStatic();

  const renderRuntimeTag = webpackManifest['runtime.js']
    ? `<script src="${webpackManifest['runtime.js']}" defer></script>`
    : '';
  const renderClientCssTag = webpackManifest['main.css']
    ? `<link rel="stylesheet" href="${webpackManifest['main.css']}">`
    : '';
  const renderVendorsJsTag = webpackManifest['vendors.js']
    ? `<script src="${webpackManifest['vendors.js']}" defer></script>`
    : '';

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${helmet.title.toString()}

        ${renderClientCssTag}
        ${renderRuntimeTag}
        ${renderVendorsJsTag}
        <script src="${webpackManifest['main.js']}" defer></script>
      </head>

      <body>
        <div id="app">${appMarkup}</div>
        <script>
          window.${INITIAL_DATA_PROPERTY} = ${serialize(initialProps)}
        </script>
      </body>
    </html>
    `);
});

export default app;
