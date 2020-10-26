import path from 'path';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import serialize from 'serialize-javascript';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';

import {
  initWebpackManifest,
  renderWebpackRuntime,
  webpackManifest,
} from './webpack-manifest';

import HomeContext from './home-context';
import Home from './Home';

const PUBLIC_DIR = path.resolve(`${process.env.CLIENT_OUTPUT_PATH}/assets`);
const isDev = process.env.NODE_ENV === 'development';

const INITIAL_DATA_PROPERTY = '__INITIAL_DATA__';

initWebpackManifest();

const app = express();

app.use(
  helmet({
    // non-dev domain, automatically redirects to https: https://tools.ietf.org/html/rfc2606
    // https://mathiasbynens.be/notes/json-dom-csp
    contentSecurityPolicy: false,
  }),
);
app.use(logger(isDev ? 'dev' : 'combined'));
app.disable('etag');

app.use('/assets', express.static(PUBLIC_DIR));

app.get('/healthz', (req, res) => {
  res.send({ message: 'Ok!' });
});

app.get('/', (req, res) => {
  const initialProps = {
    title: 'Title',
  };

  const appMarkup = ReactDOMServer.renderToString(
    <HomeContext.Provider value={initialProps}>
      <Home />
    </HomeContext.Provider>,
  );
  const helmet = Helmet.renderStatic();

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
        ${renderWebpackRuntime()}
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
