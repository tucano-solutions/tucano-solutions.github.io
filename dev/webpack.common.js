const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const projectRoot = path.resolve(__dirname, '../');
const outputFolder = projectRoot;
const resourcesFolder = path.resolve(projectRoot, 'resources');
const cleanWebpackRoot = path.resolve(projectRoot, '../');
const src = path.resolve(__dirname, '../src');

const foldersToDelete = [
  path.resolve(projectRoot, 'index.html'),
  path.resolve(projectRoot, 'resources'),
]
const cleanWebpackOptions = {
  root:     projectRoot,
  exclude:  [],
  verbose:  true,
  dry: true
}

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    path: resourcesFolder
});

module.exports = {
  entry: {
    app: path.resolve(src, 'index.js')
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: resourcesFolder
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: extractSass.extract({
        use: [{
          loader: "css-loader",
          options: {
            sourceMap: true
          }
        }, {
          loader: "postcss-loader",
          options: {
            sourceMap: true,
            config: {
              path: path.resolve(__dirname, 'postcss.config.js')
            }
          }
        }, {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }],
        fallback: "style-loader"
      })
    }, {
      test: /\.pug$/,
      use: [{
        loader: "pug-loader"
      }]
    }, {
      test: /\**\/*.js$/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader"
      }]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin([foldersToDelete], cleanWebpackOptions),
    new HtmlWebpackPlugin({
      template: path.resolve(src, 'index.pug')
    }),
    extractSass
  ]
};
