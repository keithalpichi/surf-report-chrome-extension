const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const APP = {
  title: 'Surf Report'
}

module.exports = {
  entry: {
    background: './src/background.ts',
    content: './src/content.tsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: require('./webpack.rules'),
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    // new CopyPlugin({
    //   patterns: [{
    //     from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js',
    //   }],
    // }),
    new HtmlWebpackPlugin({
      title: APP.title,
      template: './src/index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/manifest.json', to: '.' },
      ],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.json']
  },
  devServer: {
    contentBase: './dist',
    port: 8080,
    hot: true,
    writeToDisk: true,
    historyApiFallback: true
  },
  devtool: 'inline-source-map',
  mode: 'development'
};