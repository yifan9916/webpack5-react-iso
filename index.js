process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webConfig = require('./webpack.web.js');
const nodeConfig = require('./webpack.node.js');

const webCompiler = webpack(webConfig);

const nodeCompiler = webpack(nodeConfig);

let watching;

webCompiler.hooks.done.tap('WebpackDevWatch', (stats) => {
  if (watching) return;
  console.log('Web compiler done!');
  watching = nodeCompiler.watch({}, (stats) => {
    console.log('Node compiler watching...');
  });
});

const devServer = new WebpackDevServer(webCompiler, webConfig.devServer);
const devServerHost = webConfig.devServer.host;
const devServerPort = webConfig.devServer.port;

devServer.listen(devServerPort, devServerHost, () => {
  console.log('WDS running!');
});
