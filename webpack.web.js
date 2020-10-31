const path = require('path');

const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const CLIENT_OUTPUT_PATH = 'public';
// if you want your server to be accessible externally, specify a host ip like this for Docker
const DEV_SERVER_HOST = '0.0.0.0';
const DEV_SERVER_PORT = 3001;
const ASSET_PATH = isDev
  ? `http://${DEV_SERVER_HOST}:${DEV_SERVER_PORT}/assets/`
  : 'assets/';

const devServerOptions = {
  compress: true,
  contentBase: path.resolve(__dirname, CLIENT_OUTPUT_PATH),
  disableHostCheck: true,
  // enables node server to access dev assets from wds
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: true,
  host: DEV_SERVER_HOST,
  hot: true,
  overlay: {
    error: true,
  },
  port: DEV_SERVER_PORT,
  stats: 'errors-only',
  // quiet: true,
  writeToDisk: true,
};

const optimizationDev = {
  removeAvailableModules: false,
  removeEmptyChunks: false,
  splitChunks: false,
};

const optimizationProd = {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      defaultVendors: {
        name: 'vendors',
        test: /[\\/]node_modules[\\/]/,
        chunks: 'all',
      },
    },
  },
  runtimeChunk: 'single',
  moduleIds: 'deterministic',
  minimizer: [
    new TerserJSPlugin(),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        parser: safePostCssParser,
        map: {
          inline: false,
          annotation: true,
        },
      },
    }),
  ],
};

module.exports = {
  mode: isDev ? 'development' : 'production',
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  entry: {
    main: './src/client.jsx',
  },
  devtool: isDev && 'inline-source-map',
  devServer: isDev ? devServerOptions : {},
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
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: isDev ? '[name]__[local]' : '[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
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
    new ManifestPlugin(),
    new WebpackBar({
      name: 'Web',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.resolve(__dirname, `${CLIENT_OUTPUT_PATH}/assets/**/*`),
      ],
    }),
    isDev && new webpack.HotModuleReplacementPlugin(),
    isDev && new ReactRefreshWebpackPlugin(),
    isProd &&
      new MiniCssExtractPlugin({
        filename: 'stylesheets/main.styles.[contenthash:8].css',
        chunkFilename: 'stylesheets/[name].styles.[contenthash:8].css',
      }),
  ].filter(Boolean),
  stats: isDev ? 'errors-only' : 'normal',
  output: {
    filename: isDev
      ? 'javascript/[name].bundle.js'
      : 'javascript/[name].bundle.[chunkhash:8].js',
    chunkFilename: isDev
      ? 'javascript/[name].chunk.js'
      : 'javascript/[name].chunk.[chunkhash:8].js',
    path: path.resolve(__dirname, `${CLIENT_OUTPUT_PATH}/assets`),
    publicPath: ASSET_PATH,
  },
  optimization: isDev ? optimizationDev : optimizationProd,
};
