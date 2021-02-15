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
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const IS_DEV = process.env.NODE_ENV === 'development';
const IS_PROD = process.env.NODE_ENV === 'production';
const ANALYZE = process.env.ANALYZE === 'true';

const CLIENT_OUTPUT_PATH = 'public';
// if you want your server to be accessible externally, specify a host ip like this for Docker
const DEV_SERVER_HOST = '0.0.0.0';
const DEV_SERVER_PORT = 3001;
const ASSET_PATH = IS_DEV
  ? `http://${DEV_SERVER_HOST}:${DEV_SERVER_PORT}/assets/`
  : 'assets/';

const devServerOptions = {
  compress: true,
  contentBase: path.resolve(__dirname, CLIENT_OUTPUT_PATH),
  disableHostCheck: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: true,
  host: DEV_SERVER_HOST,
  hot: true,
  overlay: {
    error: true,
  },
  port: DEV_SERVER_PORT,
  stats: 'errors-only',
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
  mode: IS_DEV ? 'development' : 'production',
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  entry: {
    main: './src/client.jsx',
  },
  devtool: IS_DEV && 'inline-source-map',
  devServer: IS_DEV ? devServerOptions : {},
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
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV,
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: IS_DEV ? '[name]__[local]' : '[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: IS_DEV,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: IS_DEV,
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
    IS_DEV && new webpack.HotModuleReplacementPlugin(),
    IS_DEV && new ReactRefreshWebpackPlugin(),
    IS_PROD &&
      new MiniCssExtractPlugin({
        filename: 'stylesheets/main.styles.[contenthash:8].css',
        chunkFilename: 'stylesheets/[name].styles.[contenthash:8].css',
      }),
    ANALYZE && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  stats: IS_DEV ? 'errors-only' : 'normal',
  output: {
    filename: IS_DEV
      ? 'javascript/[name].bundle.js'
      : 'javascript/[name].bundle.[chunkhash:8].js',
    chunkFilename: IS_DEV
      ? 'javascript/[name].chunk.js'
      : 'javascript/[name].chunk.[chunkhash:8].js',
    path: path.resolve(__dirname, `${CLIENT_OUTPUT_PATH}/assets`),
    publicPath: ASSET_PATH,
  },
  optimization: IS_DEV ? optimizationDev : optimizationProd,
};
