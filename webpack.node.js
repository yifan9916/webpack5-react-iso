const path = require('path');

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
const StartServerPlugin = require('razzle-start-server-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const CLIENT_OUTPUT_PATH = 'public';

module.exports = {
  mode: isDev ? 'development' : 'production',
  target: 'node',
  devtool: 'cheap-module-source-map',
  resolve: {
    alias: {
      'webpack/hot/poll': 'webpack/hot/poll',
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  entry: {
    server: isDev
      ? ['webpack/hot/poll?300', './src/server.js']
      : ['./src/server.js'],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?300'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                exportOnlyLocals: true,
                localIdentName: isDev ? '[name]__[local]' : '[hash:base64:5]',
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.CLIENT_OUTPUT_PATH': JSON.stringify(CLIENT_OUTPUT_PATH),
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist/**/*')],
    }),
    new WebpackBar({
      name: 'node',
    }),
    isProd &&
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    isDev && new webpack.HotModuleReplacementPlugin(),
    isDev &&
      new StartServerPlugin({
        entryName: 'server',
      }),
  ].filter(Boolean),
  stats: isDev ? 'errors-only' : 'normal',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
