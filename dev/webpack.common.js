const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const projectRoot = path.resolve(__dirname, '../');
const dist = path.resolve(projectRoot, 'dist');
const src = path.resolve(projectRoot, 'src');
const indexHtmlFile = path.resolve(dist, 'index.html');

const thingsToDelete = [
  indexHtmlFile,
  dist
];
const cleanWebpackOptions = {
  root:     projectRoot,
  exclude:  [],
  verbose:  true,
  dry: false
};

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
});

module.exports = {
  entry: {
    app: path.resolve(src, 'index.js')
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: dist
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
    new CleanWebpackPlugin(thingsToDelete, cleanWebpackOptions),
    new HtmlWebpackPlugin({
      template: path.resolve(src, 'index.pug'),
      filename: indexHtmlFile
    }),
    extractSass
  ]
};
