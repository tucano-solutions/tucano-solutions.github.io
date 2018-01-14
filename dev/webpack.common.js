const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const projectRoot = path.resolve(__dirname, '../');
const outputFolder = projectRoot;
const cleanWebpackRoot = path.resolve(projectRoot, '../');

const cleanWebpackOptions = {
  root:     cleanWebpackRoot,
  exclude:  ['dev, src, .gitignore, CNAME', 'package*.json', 'README.md'],
  verbose:  true,
  dry: true
}

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
});

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, `${outputFolder}`)
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
            sourceMap: true
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
    new CleanWebpackPlugin([projectRoot]),
    new HtmlWebpackPlugin({
      template: 'src/index.pug'
    }),
    extractSass
  ]
};
